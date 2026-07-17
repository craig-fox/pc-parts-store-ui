function CheckoutForm() {
    return (
        <form className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                    <label htmlFor="first-name" className="mb-2 font-medium">
                        First Name
                    </label>
                    <input id="first-name" name="firstName" type="text" className="rounded-md border border-slate-300 px-3 py-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="last-name" className="mb-2 font-medium">
                        Last Name
                    </label>
                    <input id="last-name" name="lastName" type="text" className="rounded-md border border-slate-300 px-3 py-2" />
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium">
                    Email
                </label>
                <input id="email" name="email" type="email" className="rounded-md border border-slate-300 px-3 py-2" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="address" className="mb-2 font-medium">
                    Address
                </label>
                <input id="address" name="address" type="text" className="rounded-md border border-slate-300 px-3 py-2" />
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col">
                    <label htmlFor="city" className="mb-2 font-medium">
                        City
                    </label>
                    <input id="city" name="city" type="text" className="rounded-md border border-slate-300 px-3 py-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="postcode" className="mb-2 font-medium">
                        Postcode
                    </label>
                    <input id="postcode" name="postcode" type="text" className="rounded-md border border-slate-300 px-3 py-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="country" className="mb-2 font-medium">
                        Country
                    </label>
                    <input id="country" name="country" type="text" className="rounded-md border border-slate-300 px-3 py-2" />
                </div>
            </div>
        </form>
    );
}

export default CheckoutForm;
