import { Request, Response, request } from "express";
import { responseModel } from "../../../interface";
import { details } from "../../model/productInterface";
import productRepository from '../../repository/index'
import * as yup from 'yup';


let response = new responseModel;
class productController {
    async ProductDetails(req: Request, res: Response) {
        try {
            // const data = req.body;
            // console.log(data)
            const details = {
                title: req.body.title,
                description: req.body.description,
                categoryid: req.body.category,
                image: req.file
            }
            let userSchema = yup.object({
                title: yup.string().required(" Please Enter Your Title !"),
                description: yup.string().required(" Please Enter Title Description !"),
                categoryid: yup.array().required(" Please Enter Your Category ! "),
                image: yup.object().required(" Please Enter Your Image file ! "),

            });
            if (await userSchema.isValid(details)) {

                const productresponse = await productRepository.productRepository.productDetail(details);
                response.status = 200
                response.message = " User  data Added success "
                response.data = productresponse
                response.token = null
            } else {
                console.log("res error ", Error);
                response.status = 400
                response.message = Error as unknown as string
                response.data = null
                response.token = null
            }
        } catch (error) {
            console.log("resqw", error);
            response.status = 400
            response.message = error as string
            response.data = null
            response.token = null
        }
        res.send(response);
    }

    async getproductdetails(req: Request, res: Response) {

        try {
            const productresponse = await productRepository.productRepository.getproduct();
            response.status = 200
            response.message = " Post  data Get success "
            response.data = productresponse

        } catch (error) {
            console.log(error);
            response.status = 400
            response.message = error as string
            response.data = null
        }
        res.send(response);


    }


    async deleteproductdetails(req: Request, res: Response) {

        try {
            const productid = req.params.id;
            const productresponse = await productRepository.productRepository.deleteproduct(productid);
            response.status = 200
            response.message = " Product  data Deleted success "
            response.data = productresponse

        } catch (error) {
            console.log(error);
            response.status = 400
            response.message = error as string
            response.data = null
        }

        res.send(response);

    }


    async sortingSearchPostDetails(req: Request, res: Response) {

        const sortstring = req.query.sort;
        const searchstring = req.query.search;
        const paginationstring = req.query.pagination;
        console.log("pagination ", paginationstring);
        //console.log("pagination number ", parseInt(paginationstring));
        console.log("pagination  type ", typeof (paginationstring));

        try {
            const productresponse = await productRepository.productRepository.sortingSearchproduct(searchstring, sortstring, paginationstring);
            response.status = 200
            response.message = " Product  data Sorted success "
            response.data = productresponse
        } catch (error) {
            console.log(error);
            response.status = 400
            response.message = error as string
            response.data = null
        }
        res.send(response);

    }


}

export default new productController();