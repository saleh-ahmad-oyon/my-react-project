import { DevTool } from "@hookform/devtools";
import { postData } from "@/lib/services";
import { useCookies } from "react-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'

export interface ILogin {
  access_token: string;
  refresh_token: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [_, setCookie] = useCookies(["token"]);

  const onSubmit = async (params: FormData) => {
    const formData = { email: params.email, password: params.password };
    const {success, data} = await postData<FormData, ILogin>("auth/login", formData);

    if (success && data) {
      const {access_token} = data
      setCookie("token", access_token)

      const previousUrl = location.state?.from || "/";
      const isInternalLink =
        previousUrl.startsWith("/") ||
        previousUrl.startsWith(window.location.origin);
      navigate(isInternalLink ? previousUrl : "/");
    }
  };

  const schema = Yup.object({
    email: Yup.string()
      .required('Email is required.')
      .email('Invalid Email Address.'),
    password: Yup.string()
      .required('Password is required.')
  })

  type FormData = Yup.InferType<typeof schema>

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  return (
    <div className="page-container pt-20">
      <div className="border flex p-10 shadow">
        <div className="flex-1">
          <div className="flex items-center justify-center h-full w-full">
            <BiCart className="text-sky-800 text-[300px]" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="john@mail.com"
                />
                {errors.email && (
                  <p className="text-red-600  pt-2">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="changeme"
                />
                {errors.password && (
                  <p className="text-red-600  pt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <Button
                  type="submit"
                  className="bg-sky-800 hover:bg-sky-900 text-white"
                >
                  Submit
                </Button>
              </div>
            </form>
            <DevTool control={control} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;