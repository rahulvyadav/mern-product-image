import { Request, Response } from "express";
import { details } from "../../model/productInterface";
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class productRepositary {
    async productDetail(detailsmodel: any) {
        console.log("jb", detailsmodel)
        let responseProduct = await prisma.products.create({
            data:
                detailsmodel


        })
        return responseProduct;
    }

    async getproduct() {
        let responseProduct = await prisma.products.findMany({
            include: {
                categories: true
            }
            // include: {
            //     categories: {
            //         select: { category_name: true }
            //     }
            // }
        });
        return responseProduct;
    }


    async deleteproduct(postid: any) {
        let responseProduct = await prisma.products.delete({
            where: { id: postid },
        })
        return responseProduct;
    }

    async sortingSearchproduct(searchstring: any, sortstring: any, paginationstring: any) {
        let whereCondition = {};
        let orderByCondition = {};
        let a: number = 0;

        if (searchstring) {
            whereCondition = {
                title: { contains: searchstring, mode: "insensitive" }
            };
        }

        if (sortstring) {
            orderByCondition = { title: sortstring };
        }

        if (paginationstring) {
            a = parseInt(paginationstring);
            if (isNaN(a) || a < 1) {
                // Handle invalid paginationstring
                throw new Error("Invalid pagination value");
            }
        }
        //  console.log("first", ~~paginationstring);
        //  console.log("first type ", typeof (~~paginationstring));

        const responseProduct = await prisma.products.findMany({
            where: whereCondition,
            include: {
                categories: true
            },
            orderBy: orderByCondition,
            skip: 4 * (a - 1),
            take: 4,

        });

        return responseProduct
    }


}

export default new productRepositary();