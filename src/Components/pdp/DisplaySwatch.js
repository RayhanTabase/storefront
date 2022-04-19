import React, { Component} from 'react';

class DisplaySwatch extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedImage : '',
    };
  };

  displayList = () => {
    return this.props.attribute.items.map((item) =>{
      let isSelected = false;
      Object.entries(this.props.selectedAttributes).forEach((obj) => {
        let attId = obj[0];
        let attVal = obj[1];
        if (attId === this.props.attribute.id && attVal === item.value ) {
          isSelected = true;
        }
      })
      return (
        <button
          key={item.value}
          className={`attribute-value-color ${isSelected && 'attribute-selected-color'}`}
          type="button"
          onClick={() => this.props.addAttribute(this.props.attribute.id, item.value)}
          style={{ background: `${item.value}` }}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <p className="product-attribute-title">
          {this.props.attribute.name}:
        </p>
        <div className="product-attribute-section d-flex">
          {this.displayList()}
        </div>
      </div>
    )
  }
}

export default DisplaySwatch;