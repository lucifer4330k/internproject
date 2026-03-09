import { useCheckoutStore } from '@/store/useCheckoutStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const formSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{10}$/, 'Must be a valid 10-digit phone number'),
    pinCode: z.string().regex(/^\d{6}$/, 'Must be a valid 6-digit PIN code'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function AddressScreen() {
    const { address, setAddress, nextStep, prevStep } = useCheckoutStore();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: address || {
            fullName: '',
            email: '',
            phone: '',
            pinCode: '',
            city: '',
            state: ''
        }
    });

    const onSubmit = (data: FormData) => {
        setAddress(data);
        nextStep();
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 max-w-2xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <button
                    onClick={prevStep}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft size={18} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Details</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            {...register('fullName')}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                            placeholder="Riya Sharma"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            {...register('email')}
                            type="email"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                            placeholder="riya@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            {...register('phone')}
                            type="tel"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                            placeholder="9876543210"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">PIN Code</label>
                        <input
                            {...register('pinCode')}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.pinCode ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                            placeholder="560001"
                        />
                        {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <input
                            {...register('city')}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                            placeholder="Bengaluru"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">State</label>
                        <input
                            {...register('state')}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.state ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                            placeholder="Karnataka"
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-sm shadow-emerald-200 transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
                    >
                        Continue to Payment
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    );
}
