import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email()
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant,
    })

    const navigate = useNavigate()

    async function handleSignUp(data: SignUpForm) {
        try {
            await registerRestaurantFn({
                    restaurantName: data.restaurantName,
                    managerName: data.managerName,
                    email: data.email,
                    phone: data.phone
                })

            toast.success('Restaurante cadastrado com sucesso!.', {
                action: {
                    label: 'Login',
                    onClick: () => navigate(`/sign-in?email=${data.email}`)
                }
            })
        } catch {
            toast.error('Erro ao cadastrar restaurante.')
        }
    }

    return (
        <>
            <Button variant="ghost" asChild >
                <Link to="/sign-in" className="absolute right-8 top-8">
                    Fazer login
                </Link>
            </Button>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Crie sua conta grátis
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Seja um parceiro e comece suas vendas!
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">

                        <div className="space-y-2 shadow">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input id="restaurantName" type="text" {...register('restaurantName')} />
                        </div>

                        <div className="space-y-2 shadow">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input id="managerName" type="text" {...register('managerName')} />
                        </div>

                        <div className="space-y-2 shadow">
                            <Label htmlFor="phone">Seu telefone</Label>
                            <Input id="phone" type="tel" {...register('phone')} />
                        </div>

                        <div className="space-y-2 shadow">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            Finalizar cadastro
                        </Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos <a className="underline underline-offset-4" href="">termos de serviço</a> e <a className="underline underline-offset-4" href="">políticas de privacidade</a>.
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
