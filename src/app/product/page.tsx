'use client'

import Invoice from "@/components/Invoice";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SubmitButton } from "@/components/submit-button";
import { useAuth } from "@/services/authContext";
import { _downloadInvoice, _uploadInvoice } from "@/services/services";
import { ChangeEvent, useEffect, useState } from "react";

export interface IProduct {
    name: string;
    quantity: number;
    rate: number;
    total?: number;
}
export default function Product() {
    const { loggedInState } = useAuth()
    const [products, setProducts] = useState<IProduct[]>([])
    const [productInfo, setProductInfo] = useState<IProduct>({
        name: "", quantity: 0, rate: 0, total: 0
    })
    const productChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setProductInfo({ ...productInfo, [e.currentTarget.name]: e.currentTarget.value })
    }
    const addToProductList = () => {
        if (!productInfo.name.length)
            return
        setProducts([...products, productInfo])
    }
    const uploadHandler = async () => {
        try {
            const res = await _uploadInvoice(loggedInState.token ?? '', {
                items: products,
                totalAmount,
                grandTotal
            })
            const result = await res.json()
            if (res.ok && res.status === 201) {
                const response = await _downloadInvoice(loggedInState.token ?? '', {
                    items: products,
                    totalAmount,
                    grandTotal
                })
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                // Create a link element and simulate a click to download the PDF
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'invoice.pdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const totalAmount = products.reduce((acc: any, item: any) => acc + (item.quantity * item.rate), 0)
    const grandTotal = (((18 / 100) * totalAmount) + totalAmount)
    useEffect(() => {
        const newTotal = productInfo.quantity * productInfo.rate;
        setProductInfo(prevInfo => ({
            ...prevInfo,
            total: newTotal
        }));
    }, [productInfo.quantity, productInfo.rate]);
    return (
        <ProtectedRoute>
            <main className="flex flex-col w-full justify-center items-center pt-20">
                <div className=" w-full max-w-md rounded-2xl border border-gray-100 shadow-xl">
                    <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                        <h3 className="text-xl font-semibold">Add Product</h3>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        addToProductList()
                    }}
                        className="flex flex-col space-y-4  px-4 py-8 sm:px-16">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-xs text-gray-600 uppercase"
                            >
                                Product Name
                            </label>
                            <input
                                onChange={(e) => productChangeHandler(e)}
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="quantity"
                                className="block text-xs text-gray-600 uppercase"
                            >
                                Quantity
                            </label>
                            <input
                                onChange={(e) => productChangeHandler(e)}
                                id="quantity"
                                name="quantity"
                                type="number"
                                min={0}
                                max={100}
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="rate" className="block text-xs text-gray-600 uppercase">Price</label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">&#8377;</span>
                                </div>
                                <input onChange={(e) => productChangeHandler(e)} type="text" name="rate" id="rate" className="mt-1 pl-7 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="0.00" />
                            </div>
                        </div>
                        <SubmitButton state={false}>Add</SubmitButton>
                    </form>
                </div>
                <Invoice products={products} totalAmount={totalAmount} grandTotal={grandTotal} />

                <button onClick={uploadHandler} className=" bg-black py-2.5 rounded-md px-5 m-auto mb-10 text-white" >Save Bill and Download</button>
            </main>
        </ProtectedRoute>
    )

}