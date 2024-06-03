'use client'
export function Form({
    action,
    children,
    type = "sign in"
}: {
    action: any;
    children: React.ReactNode;
    type?: string
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                const formdata = new FormData(e.target as HTMLFormElement)
                action(formdata)
            }}
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
            {
                type === 'sign up' &&
                <div>
                    <label
                        htmlFor="name"
                        className="block text-xs text-gray-600 uppercase"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
            }
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@acme.com"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            {children}
        </form>
    );
}