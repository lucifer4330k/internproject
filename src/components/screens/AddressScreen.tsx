import { useCheckoutStore, Address } from '@/store/useCheckoutStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, ArrowRight, Plus, MapPin, CheckCircle2, Pencil } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{10}$/, 'Must be a valid 10-digit phone number'),
    houseNumber: z.string().min(1, 'House/Flat No. is required'),
    exactLocation: z.string().min(5, 'Location details are required'),
    pinCode: z.string().regex(/^\d{6}$/, 'Must be a valid 6-digit PIN code'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function AddressScreen() {
    const { addresses, selectedAddressId, addAddress, updateAddress, setSelectedAddress, nextStep, prevStep } = useCheckoutStore();
    
    // Automatically show new address form if no addresses are stored
    const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            houseNumber: '',
            exactLocation: '',
            pinCode: '',
            city: '',
            state: ''
        }
    });

    const onSubmit = (data: FormData) => {
        if (editingAddressId) {
            updateAddress(editingAddressId, data);
            setEditingAddressId(null);
        } else {
            const newAddress: Address = {
                id: Date.now().toString(),
                ...data
            };
            addAddress(newAddress);
            // Automatically proceed after saving a brand new address (optional config)
            nextStep();
        }
        setIsAddingNew(false);
        reset({
            fullName: '', email: '', phone: '', houseNumber: '', exactLocation: '', pinCode: '', city: '', state: ''
        });
    };

    const startEditing = (e: React.MouseEvent, addr: Address) => {
        e.stopPropagation();
        setSelectedAddress(addr.id);
        reset({
            fullName: addr.fullName,
            email: addr.email,
            phone: addr.phone,
            houseNumber: addr.houseNumber,
            exactLocation: addr.exactLocation,
            pinCode: addr.pinCode,
            city: addr.city,
            state: addr.state
        });
        setEditingAddressId(addr.id);
        setIsAddingNew(true);
    };

    const handleNextClick = () => {
        if (isAddingNew) {
            // Programmatically submit the form
            const form = document.getElementById('address-form') as HTMLFormElement;
            if (form) form.requestSubmit();
        } else {
            if (selectedAddressId) {
                nextStep();
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 max-w-2xl mx-auto mb-20">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Details</h2>
                    <p className="text-gray-500 mt-1 sm:text-base text-sm">Where should we send your order?</p>
                </div>
            </div>

            {/* Address Selection List */}
            {!isAddingNew && addresses.length > 0 && (
                <div className="space-y-4 mb-8">
                    {addresses.map((addr) => (
                        <div 
                            key={addr.id}
                            onClick={() => setSelectedAddress(addr.id)}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                                selectedAddressId === addr.id 
                                ? 'border-emerald-500 bg-emerald-50/30' 
                                : 'border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/10'
                            }`}
                        >
                            <div className="flex gap-4 items-start">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                    selectedAddressId === addr.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    <MapPin size={20} />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900">{addr.fullName}</h3>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={(e) => startEditing(e, addr)}
                                                className="text-gray-400 hover:text-emerald-600 transition-colors shrink-0"
                                                aria-label="Edit address"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            {selectedAddressId === addr.id && (
                                                <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-gray-600 text-sm space-y-1 pr-10">
                                        <p>{addr.phone} • {addr.email}</p>
                                        <p>{addr.houseNumber}, {addr.exactLocation}</p>
                                        <p>{addr.city}, {addr.state} {addr.pinCode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button 
                        onClick={() => setIsAddingNew(true)}
                        className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-600 font-medium hover:border-emerald-500 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={18} />
                        Add a New Address
                    </button>
                </div>
            )}

            {/* New Address Form */}
            {isAddingNew && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {addresses.length > 0 && (
                        <div className="mb-6">
                            <button 
                                onClick={() => {
                                    setIsAddingNew(false);
                                    setEditingAddressId(null);
                                    reset({
                                        fullName: '', email: '', phone: '', houseNumber: '', exactLocation: '', pinCode: '', city: '', state: ''
                                    });
                                }}
                                className="text-emerald-600 font-medium text-sm hover:underline flex items-center gap-1"
                            >
                                <ArrowLeft size={14} /> Back to saved addresses
                            </button>
                        </div>
                    )}
                    
                    <form id="address-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                <label className="text-sm font-medium text-gray-700">House No. / Flat No.</label>
                                <input
                                    {...register('houseNumber')}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.houseNumber ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                                    placeholder="Flat 201, Maple Heights"
                                />
                                {errors.houseNumber && <p className="text-red-500 text-xs mt-1">{errors.houseNumber.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Exact Location / Street</label>
                                <input
                                    {...register('exactLocation')}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.exactLocation ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-emerald-500'} bg-gray-50/50 focus:bg-white transition-colors`}
                                    placeholder="12th Main Road, Indiranagar"
                                />
                                {errors.exactLocation && <p className="text-red-500 text-xs mt-1">{errors.exactLocation.message}</p>}
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
                    </form>
                </div>
            )}

            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 sm:p-6 z-[60] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <button
                        onClick={prevStep}
                        className="h-14 px-6 sm:px-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors font-semibold"
                        aria-label="Go back to Cart"
                    >
                        <ArrowLeft size={20} className="sm:mr-2" />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                    
                    <button
                        onClick={handleNextClick}
                        disabled={!isAddingNew && !selectedAddressId}
                        className="flex-grow sm:flex-grow-0 sm:w-64 bg-emerald-600 disabled:bg-gray-300 disabled:text-gray-500 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-md shadow-emerald-200 disabled:shadow-none transition-all flex items-center justify-center gap-2 group text-lg"
                    >
                        {isAddingNew ? (editingAddressId ? 'Save Changes' : 'Save & Continue') : 'Continue to Payment'}
                        <ArrowRight size={20} className={`${!isAddingNew && !selectedAddressId ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                    </button>
                </div>
            </div>
        </div>
    );
}
