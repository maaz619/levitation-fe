import { IProduct } from "@/app/product/page";

export interface ILoginBody {
    name?: string;
    email: string;
    password: string;
}
export interface IUploadInvoiceBody {
    items: IProduct[];
    totalAmount: number;
    grandTotal: number
}
const BASE_URL = 'https://levitation-be-c788354a5637.herokuapp.com/api/v1'
const LOGIN_URI = BASE_URL + '/auth/signin'
const SIGNUP_URI = BASE_URL + '/auth/signup'
const PROFILE_URI = BASE_URL + '/auth/profile'
const INVOICE_URI = BASE_URL + '/invoices'
const INVOICE_UPLOAD_URI = BASE_URL + '/uploadInvoice'
const INVOICE_DOWNLOAD_URI = BASE_URL + '/downloadInvoice'

async function _login(body: ILoginBody) {
    const response = await fetch(LOGIN_URI, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    return response
}

async function _register(body: ILoginBody) {
    const response = await fetch(SIGNUP_URI, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    return response
}

async function _getMe(token: string) {
    const response = await fetch(PROFILE_URI, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    return response
}
async function _getInvoices(token: string) {
    const response = await fetch(INVOICE_URI, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    return response
}
async function _uploadInvoice(token: string, body: IUploadInvoiceBody) {
    const response = await fetch(INVOICE_UPLOAD_URI, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    return response
}
async function _downloadInvoice(token: string, body: IUploadInvoiceBody) {
    const response = await fetch(INVOICE_DOWNLOAD_URI, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })
    return response
}

export { _login, _register, _getMe, _getInvoices, _uploadInvoice, _downloadInvoice }