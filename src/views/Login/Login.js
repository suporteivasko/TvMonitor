import React, { useContext, useEffect, useState } from 'react';
import './login.css';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sniper } from '../../Components/Loadings/Sniper';

import InputMask from 'react-input-mask';



export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [hash, setHash] = useState('');
    const [errors, setErrors] = useState({ empresa: '', senha: '' });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        // Limpe os erros ao enviar o formulário
        setErrors({ empresa: '', senha: '' });

        // Validações
        let formIsValid = true;

        if (id.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, empresa: 'Informe o código da empresa' }));
            formIsValid = false;
        }

        if (hash.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, senha: 'Informe sua senha' }));
            formIsValid = false;
        }

        // Se o formulário for válido, continue com a lógica de login
        if (formIsValid) {
            
            const isLogged =  await auth.signin(id, hash);
           
            if(isLogged !== false){
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                navigate('/');
            }else{
                setId('');
                setHash('');
                setError('Ops!, Credenciais incorretas!!!');
                setTimeout(() => {
                    setLoading(false);
                    setError('');
                }, 2000);
                navigate('/login');
            }
        }
       
    };

    return (
        
        <div className="container">
            { isLoading && <Sniper isLoading={isLoading}/> }
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-5 d-flex justify-content-center">
                    <img src='./logo.png' alt="Logo" style={{ width: '300px', height: '300px' }} />
                </div>
            </div>
            <div className="row mt-4">
               
                <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-5 d-flex justify-content-center">
                    <div className="card col-sm-8 col-md-6 col-lg-4 col-12 card-login">
                       
                        <form onSubmit={handleSubmit} className="form-login ">
                            {error &&
                                <div className='alert alert-danger'>
                                    {error}
                                </div>
                            }
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-12 mb-2">
                                        <label className='text-light'>Empresa</label>
                                        <InputMask
                                            mask="9"
                                            maskChar=""
                                            formatChars={{ '9': '[0-9]', '*': '[0-9]*' }}
                                            className="form-control"
                                            type='text'
                                            placeholder='Informe o código da Empresa'
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                        <span className='text-danger'>{errors.empresa}</span>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                                        <label className='text-light'>Senha</label>
                                        <input
                                            className="form-control"
                                            type='password'
                                            placeholder='Informe sua senha'
                                            value={hash}
                                            onChange={(e) => setHash(e.target.value)}
                                        />
                                        <span className='text-danger'>{errors.senha}</span>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-12 d-grid">
                                        <button
                                            type='submit'
                                            className='btn btn-login'
                                            disabled={isLoading}
                                        >
                                            Acessar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
