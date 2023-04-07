import React, { Component } from 'react';
import './HomeInstitutional.css';



class HomeInstitutional extends Component {
    render() {
        return (
            <div className='page'>
                <div className='nav'>
                    <div></div>
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
            </div>
        );
    }
}

export default HomeInstitutional;