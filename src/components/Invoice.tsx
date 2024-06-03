// src/components/Invoice.js

import { IProduct } from '@/app/product/page';
import React from 'react';

const Invoice = ({ products, totalAmount, grandTotal }: any) => {
    const date = new Date()
    return (
        <section className="lg:p-8 flex justify-center">
            <div className='max-w-3xl'>
                <div className="flex justify-between items-center mb-28">
                    <div>
                        <h1 className="text-2xl font-bold">INVOICE GENERATOR</h1>
                        <p>Sample Output should be this</p>
                    </div>
                    <img src="../favicon.ico" alt="Logo" className="w-20 h-20" />
                </div>
                <div className="">
                    <table className="w-full border-b mb-6">
                        <thead>
                            <tr className=" ">
                                <th className="border-b text-left px-10 py-2">Product Name</th>
                                <th className="border-b px-10 py-2">Qty</th>
                                <th className="border-b px-10 py-2">Rate</th>
                                <th className="border-b text-right px-10 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: IProduct, key: number) => {
                                return (
                                    <tr className=" text-center" key={key}>
                                        <td className=" px-10 py-5 text-left">{product.name}</td>
                                        <td className=" px-10 font-semibold text-blue-300 py-5">{product.quantity}</td>
                                        <td className=" px-10 py-5">{product.rate}</td>
                                        <td className=" px-10 py-5 text-right">{product.rate * product.quantity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className=" space-y-5 flex flex-col max-w-xs px-10 ml-auto mb-6">
                    <div className="flex w-full justify-between">
                        <p className='text-lg font-semibold'>Total:</p>
                        <p>INR {totalAmount}</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <p>GST:</p>
                        <p>{18}%</p>
                    </div>
                    <div className="flex border-y-2 py-5 w-full justify-between">
                        <p className='text-lg font-semibold'>Grand Total:</p>
                        <p className='text-blue-400 font-semibold'>INR {grandTotal}</p>
                    </div>
                </div>
                <p className="">Valid until: {`${date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()}`}</p>
                <footer className="mt-28 mb-10 bg-black text-white text-xs w-full py-6 px-20 rounded-full">
                    <p className="py-2">Terms and Conditions</p>
                    <p className=" leading-5 text-wrap">We are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention</p>
                </footer>
            </div>
        </section>
    );
};

export default Invoice;
