import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';


const items = [
  {
    src:'https://media.istockphoto.com/id/1194439772/es/foto/mujer-elegante-en-rosa-pantalones-de-piernas-anchas-zapatillas-y-blusa-de-rayas-est%C3%A1-posando.jpg?s=612x612&w=0&k=20&c=rdzwe_NSclWRKqOrMzRmv4_XfGmsCfRyIs-MZmfb5Ec=',
    altText: 'imagen 1'
    
  },
  {
    src: 'https://www.angelalarcon.com/themes/b2calarcon/assets/img/modules/appagebuilder/images/zapatos-stiletto-primavera-verano-ss23.jpg',
    altText: 'imagen 2'
    
  },
  {
    src: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2023/01/12/16735442163121.jpg',
    altText: 'imagen 3'
    
  }
];


class Carrusel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} width="100%" height="400px" />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Carrusel;