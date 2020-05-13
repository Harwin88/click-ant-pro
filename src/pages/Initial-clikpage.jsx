import React from "react";
import { Link } from "react-router-dom";
import TweenOne from 'rc-tween-one';
import 'rc-texty/assets/index.css';
import './Intercambios.less';
import Texty from 'rc-texty';
import Button from 'antd/lib/button';
class Intercambio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intercambios: [],
      show: true
    };
  }

  geInterval = (e) => {
    switch (e.index) {
      case 0:
        return 0;
      case 1:
        return 150;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 150 + 450 + (e.index - 2) * 10;
      default:
        return 150 + 450 + (e.index - 6) * 150;
    }
  }

  getEnter = (e) => {
    const t = {
      opacity: 0,
      scale: 0.8,
      y: '-100%',
    };
    if (e.index >= 2 && e.index <= 6) {
      return { ...t, y: '-30%', duration: 150 };
    }
    return t;
  }

  getSplit = (e) => {
    const t = e.split(' ');
    const c = [];
    t.forEach((str, i) => {
      c.push((
        <span key={`${str}-${i}`}>
          {str}
        </span>
      ));
      if (i < t.length - 1) {
        c.push(<span key={` -${i}`}> </span>);
      }
    });
    return c;
  }

  onClick = () => {
    this.setState({
      show: false,
    }, () => {
      this.setState({
        show: true
      });
    });
  }
 
  componentDidMount() {
    const url = "http://localhost:3000/api/v1/intercambios/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
           return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ intercambios: response }))
      .catch(() => this.props.history.push("/"));
  }
  render() {
    const { intercambios } = this.state;
       
    const allintercambios = intercambios.map((intercambio, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
            <img
            src={intercambio.imagen}
            className="card-img-top"
            alt={`${intercambio.name} image`}
          />

          <div className="card-body">
            <h5 className="card-title">{intercambio.name}</h5>
            <Link to={`/intercambios/${intercambio.id}`} className="btn custom-button">
                       $25000 Pague a qui.
            </Link>
            
          </div>
        </div>
      </div>     
    ));
    const nointercambio = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
           Intercambiar algo<Link to="/new_intercambio">Nuevo Intercambio.</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
             
          <div className="combined-wrapper">
        <div className="combined-reload">
          <Button shape="circle" icon="reload" onClick={this.onClick} />
        </div>
        {this.state.show && (
          <div className="combined">
            <div className="combined-shape">
              <div className="shape-left">
                <TweenOne
                  animation={[
                    { x: 158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                    { x: -158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                  ]}
                />
              </div>
              <div className="shape-right">
                <TweenOne
                  animation={[
                    { x: -158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                    { x: 158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                  ]}
                />
              </div>
            </div>
            <Texty
              className="title"
              type="mask-top"
              delay={400}
              enter={this.getEnter}
              interval={this.geInterval}
              component={TweenOne}
              componentProps={{
                animation: [
                  { x: 130, type: 'set' },
                  { x: 100, delay: 500, duration: 450 },
                  {
                    ease: 'easeOutQuart',
                    duration: 300,
                    x: 0,
                  },
                  {
                    letterSpacing: 0,
                    delay: -300,
                    scale: 0.9,
                    ease: 'easeInOutQuint',
                    duration: 1000,
                  },
                  { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
                ],
              }}
            >
            clickInnovacion
            </Texty>
            <TweenOne
              className="combined-bar"
              animation={{ delay: 2000, width: 0, x: 158, type: 'from', ease: 'easeInOutExpo' }}
            />
            <Texty
              className="content"
              type="bottom"
              split={this.getSplit}
              delay={2200}
              interval={30}
            >
              Tu mejor aliado para la trasformacion digital.
            </Texty>
          </div>
        )}
      </div>
            <h1 className="display-4">intercambios for every occasion</h1>
            <p className="lead text-muted">

               We’ve pulled together our most popular intercambios, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/intercambio" className="btn custom-button">
                Create New intercambio
              </Link>
            </div>
            <div className="row">
              {intercambios.length > 0 ? allintercambios : nointercambio}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default Intercambio;