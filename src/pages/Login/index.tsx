import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LoginFormData } from '../../interfaces/InterfaceData';
import Swal from 'sweetalert2';
import './login.module.scss'

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>({
        mode: 'onChange',
    });


    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const confirmInputRef = useRef<HTMLInputElement | null>(null);
    const passwordValue = watch('password');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        const isValidUser = data.email === 'admin@test.com' && data.password === 'Passwd18#';

        if (!isValidUser) {
            Swal.fire({
                icon: 'error',
                title: 'Credenciales inválidas',
                text: 'Verifica tu correo y contraseña.',
                confirmButtonText: 'Intentar de nuevo',
            });
            return;
        }

        login(data.email);
        navigate('/');
    };



    useEffect(() => {
        const blockCopyPaste = (e: ClipboardEvent) => e.preventDefault();

        passwordInputRef.current?.addEventListener('paste', blockCopyPaste);
        passwordInputRef.current?.addEventListener('copy', blockCopyPaste);
        confirmInputRef.current?.addEventListener('paste', blockCopyPaste);
        confirmInputRef.current?.addEventListener('copy', blockCopyPaste);

        return () => {
            passwordInputRef.current?.removeEventListener('paste', blockCopyPaste);
            passwordInputRef.current?.removeEventListener('copy', blockCopyPaste);
            confirmInputRef.current?.removeEventListener('paste', blockCopyPaste);
            confirmInputRef.current?.removeEventListener('copy', blockCopyPaste);
        };
    }, []);

    return (
        <div className="wrapper bg-white p-4 rounded shadow-sm" style={{ maxWidth: 500, margin: 'auto' }}>
            <div className="h2 text-center">LOGIN</div>

            <form className="pt-3" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <div className="form-group py-2">
                    <div className="input-field d-flex align-items-center border rounded px-2">
                        <span className="far fa-user p-2 text-secondary"></span>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className={`form-control border-0 ${errors.email ? 'is-invalid' : ''}`}
                            {...register('email', {
                                required: 'Campo requerido',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Correo inválido',
                                },
                            })}
                        />
                    </div>
                    {errors.email && <small className="text-danger">{errors.email.message}</small>}
                </div>

                {/* Password */}
                <div className="form-group py-1 pb-2">
                    <div className="input-field d-flex align-items-center border rounded px-2">
                        <span className="fas fa-lock p-2 text-secondary"></span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your Password"
                            className={`form-control border-0 ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password', {
                                required: 'Campo requerido',
                                minLength: {
                                    value: 6,
                                    message: 'Mínimo 6 caracteres',
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'Máximo 12 caracteres',
                                },
                                validate: {
                                    hasUpper: (v: string) => /[A-Z]/.test(v) || 'Debe tener una mayúscula',
                                    hasLower: (v: string) => /[a-z]/.test(v) || 'Debe tener una minúscula',
                                    hasNumber: (v: string) => /[0-9]/.test(v) || 'Debe tener un número',
                                    hasSpecial: (v: string) => /[^A-Za-z0-9]/.test(v) || 'Debe tener un carácter especial',
                                },
                            })}
                            ref={(el) => {
                                register('password').ref(el);
                                passwordInputRef.current = el;
                            }}
                        />
                        <button
                            type="button"
                            className="btn btn-sm bg-white text-muted"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            <span className={`far ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></span>
                        </button>
                    </div>
                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                </div>

                {/* Confirm Password */}
                <div className="form-group py-1">
                    <div className="input-field d-flex align-items-center border rounded px-2">
                        <span className="fas fa-lock p-2 text-secondary"></span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm your Password"
                            className={`form-control border-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            {...register('confirmPassword', {
                                required: 'Campo requerido',
                                validate: (value: string) =>
                                    value === passwordValue || 'Las contraseñas no coinciden',
                            })}
                            ref={(el) => {
                                register('confirmPassword').ref(el);
                                confirmInputRef.current = el;
                            }}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <small className="text-danger">{errors.confirmPassword.message}</small>
                    )}
                </div>

                {/* Submit */}
                <button className="btn btn-primary btn-block w-100 my-3" type="submit">
                    Log in
                </button>

            </form>
        </div>
    );
};

export default Login;
