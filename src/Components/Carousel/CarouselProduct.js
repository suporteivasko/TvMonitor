import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import api from '../../Services/api';
import { Sniper } from '../Loadings/Sniper';

const CarouselProduct = ({ empresa, sector }) => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [lastSlideReached, setLastSlideReached] = useState(false);

  useEffect(() => {
    fetchData();
  }, [empresa, sector]);

  const fetchData = async () => {
    try {
      setLoading(true);
      //const response = { data: {} };
      const response = await api.getProducts(empresa, sector);
      
      if (response.data && Object.keys(response.data).length > 0) {
        const categoriasArray = Object.entries(response.data).map(([categoria, produtos]) => ({
          categoria: formatCategoria(categoria),
          produtos: produtos.map(produto => ({
            ...produto,
            featured: parseInt(produto.featured, 10),
          })),
        }));

        setCategorias(categoriasArray);
        localStorage.setItem('list', JSON.stringify(categoriasArray));
      } else {
        
        // Se a resposta da API estiver vazia, recupera os dados do localStorage
        getList();
      }
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getList = () => {
    const categoriasFromStorage = localStorage.getItem('list');
  
    if (categoriasFromStorage) {
      const categoriasArray = JSON.parse(categoriasFromStorage);
  
      // Certifique-se de que é um array antes de setar no estado
      if (Array.isArray(categoriasArray)) {
        setCategorias(categoriasArray);
      } else {
        console.error("Dados armazenados no localStorage não são um array válido.");
      }
    }
  };

  const formatCategoria = (categoria) => {
    return categoria.replace(/\(\d+\)/, '').trim().toUpperCase();
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 900,
    arrows: false,
    autoplaySpeed: 8000,
    cssEase: "linear",
    beforeChange: (current, next) => {
      if (next === categorias.length - 1) {
        setLastSlideReached(true);
      } else {
        setLastSlideReached(false);
      }
    },
    afterChange: (index) => {
      if (lastSlideReached) {
        fetchData();
      }
    },
  };

  return (
    <div className="carousel-container">
      {isLoading && <Sniper isLoading={isLoading} />}
      {!isLoading &&
        <Slider {...settings}>
          {categorias.map((categoria, index) => (
            <div key={index}>
              <h1 className='text-center mt-3'>
                <b>
                  {categoria.categoria}
                </b>
              </h1>
              
              <ul className='list-group'>
                {categoria.produtos.map((produto) => (
                  <li 
                    key={produto.cod_int} 
                    className={`list-group-item ${parseInt(produto.featured) === 1 ? 'bg-orange' : 'bg-dark'} text-light border-0`}
                  >
                    <div className='row'>
                      <div className='col-sm-8 col-md-8 col-lg-8 col-8'>
                        <span className='text'>
                          {produto.name} 
                        </span>
                      </div>
                      <div className='col-sm-4 col-md-4 col-lg-4 col-4 d-flex justify-content-end'>
                        <span className='text pe-5'>
                          R$ {Number(produto.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Slider>
      }
    </div>
  );
};

export default CarouselProduct;
