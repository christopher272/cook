// eslint-disable-next-line no-unused-vars
import React from 'react';
import KitchenInventoryProvider from './KitchenInventoryContext';
import PropTypes from 'prop-types';

const KitchenInventory = ({ children }) => {
    return (
        <KitchenInventoryProvider>
            {children}
        </KitchenInventoryProvider>
    );
};

KitchenInventory.propTypes = {
    children: PropTypes.node.isRequired,
};

export default KitchenInventory;
