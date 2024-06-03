'use client'
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "../services/authContext";
import { _downloadInvoice, _getInvoices, _getMe } from "@/services/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { loggedInState, logout } = useAuth()
  const [invoiceData, setInvoiceData] = useState([])
  async function fetchInvoices() {
    try {
      const res = await _getInvoices(loggedInState?.token ?? '')
      const result = await res.json()
      console.log(result)
      setInvoiceData(result)
    } catch (error) {
      console.log(error)
    }
  }
  const downloader = async (data: any) => {
    try {
      const response = await _downloadInvoice(loggedInState.token ?? '', data)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to download the PDF
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(function () {
    if (loggedInState.token)
      fetchInvoices()
  }, [loggedInState.isLoggedIn])
  return (
    <ProtectedRoute>
      <main className="text-black">
        <section className="container px-4 mx-auto">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                  <table className="min-w-full divide-y  divide-gray-700">
                    <thead className=" ">
                      <tr>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          <div className="flex items-center gap-x-3">
                            <button className="flex items-center gap-x-2">
                              <span>Invoice</span>

                              <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y  ">
                      {
                        invoiceData.map((invoice: any, key: number) => {
                          return (
                            <tr key={key}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <span>{key + 1}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">{new Date(invoice.createdAt).toLocaleDateString().toString()}</td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                  <button onClick={() => downloader(invoice)} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                    Download
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </section>
      </main>
    </ProtectedRoute>
  );
}
