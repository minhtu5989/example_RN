import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';

import HeaderBtn from './HeaderBtn';
import { theme } from '../constants/theme';

class CloseBtn extends Component {
  state = {  }
  render() {
    const {color, size, ...props} = this.props
    return (
      <HeaderBtn {...props} style={{marginLeft: 8}} >
        <EvilIcons color={color} size={size} name="close" />
      </HeaderBtn>
    );
  }
}

CloseBtn.defaultProps = {
  color: theme.color.white,
  size: 32,
};

export default CloseBtn;
