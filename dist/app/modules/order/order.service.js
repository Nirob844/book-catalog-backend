"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const insertIntoDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    data.userId = userId;
    console.log(data);
    const { orderedBooks } = data, orderData = __rest(data, ["orderedBooks"]);
    const newOrder = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.order.create({
            data: orderData,
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create');
        }
        if (orderedBooks && orderedBooks.length > 0) {
            yield (0, utils_1.asyncForEach)(orderedBooks, (orderBook) => __awaiter(void 0, void 0, void 0, function* () {
                const createOrderBook = yield transactionClient.orderedBook.create({
                    data: {
                        orderId: result.id,
                        bookId: orderBook === null || orderBook === void 0 ? void 0 : orderBook.bookId,
                        quantity: orderBook === null || orderBook === void 0 ? void 0 : orderBook.quantity,
                    },
                });
                console.log(createOrderBook);
            }));
        }
        return result;
    }));
    if (newOrder) {
        const responseData = yield prisma_1.default.order.findUnique({
            where: {
                id: newOrder.id,
            },
            include: {
                user: true,
                orderedBooks: {
                    include: {
                        book: true,
                    },
                },
            },
        });
        return responseData;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create course');
});
const getAllFromDB = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'admin') {
        // Administrators can access all orders
        const allOrders = yield prisma_1.default.order.findMany({
            include: {
                user: true,
                orderedBooks: {
                    include: {
                        book: true,
                    },
                },
            },
        });
        return allOrders;
    }
    else if (role === 'customer') {
        // Customers can access their own orders
        const customerOrders = yield prisma_1.default.order.findMany({
            where: {
                userId: userId, // Filter orders by the customer's userId
            },
            include: {
                user: true,
                orderedBooks: {
                    include: {
                        book: true,
                    },
                },
            },
        });
        return customerOrders;
    }
    else {
        // Handle other roles or throw an error if needed
        throw new Error('Invalid role');
    }
});
// const getDataById = async (id: string): Promise<Order | null> => {
//   const result = await prisma.order.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       user: true,
//       orderedBooks: {
//         include: {
//           book: true,
//         },
//       },
//     },
//   });
//   return result;
// };
const getDataById = (orderId, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let order = null;
    if (role === 'admin') {
        // Admins can access any order
        order = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                user: true,
                orderedBooks: {
                    include: {
                        book: true,
                    },
                },
            },
        });
    }
    else if (role === 'customer') {
        // Customers can access their own orders
        order = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
                userId: userId, // Ensure the order belongs to the customer
            },
            include: {
                user: true,
                orderedBooks: {
                    include: {
                        book: true,
                    },
                },
            },
        });
    }
    else {
        // Handle other roles or throw an error if needed
        throw new Error('Invalid role');
    }
    return order;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateOneInDB,
    deleteByIdFromDB,
};
