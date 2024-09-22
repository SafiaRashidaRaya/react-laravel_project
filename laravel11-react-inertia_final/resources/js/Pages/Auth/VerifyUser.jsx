import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyUser() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: localStorage.getItem('email'),
        otp: '',
    });

    // const user = usePage().props.auth.user;
    // console.log(usePage().props.auth.user)
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password_confirmation: '',
    // });

    // console.log(data)

    const submit = (e) => {
        e.preventDefault();

        post(route('verifyUsingOTP'), {
            // onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const resend = (e) => {
        e.preventDefault();

        post(route('resendOTP'), {

        });
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* <h1 className='mt-4'>Verify email: {data.email}</h1> */}
            <InputLabel value="Email: " />
            <InputLabel value={data.email} />
            <br />

            <form onSubmit={submit}>
                {/* <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div> */}

                <div>
                    <InputLabel htmlFor="name" value="OTP" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.otp}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('otp', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button type='button' onClick={resend}>
                        Resend
                    </button>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Submit OTP
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
