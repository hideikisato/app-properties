import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Card } from 'rebass';
import { Link as BaseLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import context from '../../stores/context';

const Link = styled(BaseLink)`
  border-radius: 3px;
  background-color: black;
  color: white;
  padding: 10px;
  display: inline-block;
  text-decoration: none;
  margin-top: 10px;
`;

class Item extends Component {
  static contextType = context;

  render() {
    const { appStore } = this.context;
    const { item } = this.props;
    const { pricingInfos } = item;

    return (
      <Card
        fontSize={1}
        fontWeight='bold'
        p={2}
        my={2}
        bg='#efefef'
        borderRadius={8}
      >
        <Box p={2}>
          { appStore.isRental(pricingInfos.businessType) && (
            <>
              <h2>Apartamento para Aluguel</h2>
              <p>{parseFloat(pricingInfos.rentalTotalPrice).toFixed(2)}</p>
            </>
          ) }

          { appStore.isSale(pricingInfos.businessType) && (
            <>
              <h2>Apartamento para Venda</h2>
              <p>{parseFloat(pricingInfos.price).toFixed(2)}</p>
            </>
          ) }

          <Link to={(`/portal/${appStore.getPortal}/${item.id}`)} onClick={() => {
            appStore.setPropertyIdSelected(item.id);
          }}>
            Ver detalhes
          </Link>
        </Box>
      </Card>
    );
  }
}

export default observer(Item);
