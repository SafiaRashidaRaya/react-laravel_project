import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset,
    // error (It's for the alert)

  } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");

  const onChange = (value) => {
    if (value && !recaptchaVerified) {
      setRecaptchaVerified(true); // Set recaptchaVerified to true when checked
      setRecaptchaError("");
    } else {
      setRecaptchaVerified(false); // Reset if unchecked
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (!recaptchaVerified) {
      // If recaptcha is not verified, show the error message and stop form submission
      setRecaptchaError("Please complete the ReCAPTCHA");
      return;
    }
    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      {/* {error && (
        <div className="mb-4 font-medium text-sm text-red-600">
          {error}
        </div>
      )} */}

      {/* Not sure why it returns a white blank page when I uncomment it, but probably has to do with the commented parameter above. However even if I add it, it will show no alert. Also I changed AuthenticatedSessionController.php */}

      <form onSubmit={submit}>
        <div>


          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
        </div>
        <div className="block mt-4"></div>
        <ReCAPTCHA
          sitekey="6LfzmTwqAAAAAEgZhXNrrvTjd4-Js37Tz-oT_Bq6"
          onChange={onChange}
        />
        {recaptchaError && (
          <div className="text-red-600 text-sm mt-2">{recaptchaError}</div> // Display the error message in red below the ReCAPTCHA
        )}
        <div className="flex items-center justify-end mt-4">
          {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

          <PrimaryButton className="ms-4" disabled={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
// import { useState } from "react"; // import useState
// import Checkbox from "@/Components/Checkbox";
// import GuestLayout from "@/Layouts/GuestLayout";
// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from "@/Components/TextInput";
// import { Head, Link, useForm } from "@inertiajs/react";
// import ReCAPTCHA from "react-google-recaptcha";

// export default function Login({ status, canResetPassword }) {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     email: "",
//     password: "",
//     remember: false,
//   });

//   const [recaptchaVerified, setRecaptchaVerified] = useState(false); // Add state for recaptcha
//   const [recaptchaError, setRecaptchaError] = useState(""); // Add state for error message

//   // Only set state if the recaptcha status is different
//   const onChange = (value) => {
//     if (value && !recaptchaVerified) {
//       setRecaptchaVerified(true); // Set recaptchaVerified to true when checked
//       setRecaptchaError(""); // Clear error message when recaptcha is verified
//     } else if (!value && recaptchaVerified) {
//       setRecaptchaVerified(false); // Reset if unchecked
//     }
//   };

//   const submit = (e) => {
//     e.preventDefault();

//     if (!recaptchaVerified) {
//       // If recaptcha is not verified, show the error message and stop form submission
//       setRecaptchaError("Please complete the ReCAPTCHA");
//       return;
//     }

//     post(route("login"), {
//       onFinish: () => reset("password"),
//     });
//   };

//   return (
//     <GuestLayout>
//       <Head title="Log in" />

//       {status && (
//         <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
//       )}

//       <form onSubmit={submit}>
//         <div>
//           <InputLabel htmlFor="email" value="Email" />

//           <TextInput
//             id="email"
//             type="email"
//             name="email"
//             value={data.email}
//             className="mt-1 block w-full"
//             autoComplete="username"
//             isFocused={true}
//             onChange={(e) => setData("email", e.target.value)}
//           />

//           <InputError message={errors.email} className="mt-2" />
//         </div>

//         <div className="mt-4">
//           <InputLabel htmlFor="password" value="Password" />

//           <TextInput
//             id="password"
//             type="password"
//             name="password"
//             value={data.password}
//             className="mt-1 block w-full"
//             autoComplete="current-password"
//             onChange={(e) => setData("password", e.target.value)}
//           />

//           <InputError message={errors.password} className="mt-2" />
//         </div>

//         <div className="block mt-4">
//           <label className="flex items-center">
//             <Checkbox
//               name="remember"
//               checked={data.remember}
//               onChange={(e) => setData("remember", e.target.checked)}
//             />
//             <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
//               Remember me
//             </span>
//           </label>
//         </div>

//         <div className="block mt-4"></div>
//         <ReCAPTCHA
//           sitekey="6LfzmTwqAAAAAEgZhXNrrvTjd4-Js37Tz-oT_Bq6"
//           onChange={onChange} // Call onChange when recaptcha is checked
//         />
//         {recaptchaError && (
//           <div className="text-red-600 text-sm mt-2">{recaptchaError}</div> // Display the error message in red below the ReCAPTCHA
//         )}

//         <div className="flex items-center justify-end mt-4">
//           <PrimaryButton className="ms-4" disabled={processing}>
//             Log in
//           </PrimaryButton>
//         </div>
//       </form>
//     </GuestLayout>
//   );
// }
