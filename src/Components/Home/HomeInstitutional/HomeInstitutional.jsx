import React, { Component } from 'react';
import './HomeInstitutional.css';
import icon from '../../../assets/images/icon.png'
import logo from '../../../assets/images/zupMarelo4.png'
import banner from '../../../assets/images/zupMarelo1.png'


class HomeInstitutional extends Component {
    render() {
        return (
            <div className='page'>
                <div className='nav'>
                <img src={logo}/>
                    <div className='form'>
                        <button >LOGIN</button>
                        <button >CADASTRO</button>
                    </div>
                </div>
                <div className='hellcome-form'>
                    <div className='hellcome-label'>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe adipisci accusamus architecto ullam vitae velit error quam minus laboriosam? Accusantium dolorum atque expedita odit ipsa velit labore earum aliquid voluptatem?</p>
                        <button>Saiba Mais</button>
                    </div>
                    <div className='hellcome-banner'>
                        <div className='hellcome-img'>
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
                <div className='about-us'>
                    <h1>Plataforma feita por investidores
                        para investidores</h1>
                    <div className='about-us-labels'>
                        
                        <div className='about-us-divs'>
                        <div className='about-us-title'>
                        <img src={icon}/>
                                <h2>Noticias Precisas</h2>
                            </div>
                        <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, odit,
                             enim consequuntur ex quam nam rerum quos architecto perspiciatis tempore eaque impedit maxime,
                             at nesciunt voluptatem aperiam repellendus minima quae!</label>
                        </div>
                        <div className='about-us-divs'>
                        <div className='about-us-title'>
                        <img src={icon} alt="" />
                                <h2>Influenciadores</h2>
                            </div>
                        <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, odit,
                             enim consequuntur ex quam nam rerum quos architecto perspiciatis tempore eaque impedit maxime,
                             at nesciunt voluptatem aperiam repellendus minima quae!</label>
                        </div>
                        <div className='about-us-divs'>
                        <div className='about-us-title'>
                            <img src={icon} alt="" />
                                <h2>Interação entre usuários</h2>
                            </div>
                        <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, odit,
                             enim consequuntur ex quam nam rerum quos architecto perspiciatis tempore eaque impedit maxime,
                             at nesciunt voluptatem aperiam repellendus minima quae!</label>
                        </div>
                    </div>
                </div>
                <div className='register'>
                    <div className='register-banner'>
                        <img src={banner}/>
                    </div>
                    <div className='register-label'>
                        <div className='register-title'>
                        <h1>Cadastre-se e faça parte dessa comunidade</h1>
                        </div>
                        <button></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeInstitutional;