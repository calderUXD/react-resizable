
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Resizable from './Resizable';
//import {Props as ResizableProps, ResizeCallbackData} from './Resizable';
//import {Node as ReactNode} from 'react';


// An example use of Resizable.
class ResizableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
    };
  }

  static propTypes = {
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string])
  };

  static defaultProps = {
    handleSize: [20,20]
  };

  onResize = (e, data) => {
    const {size} = data;
    const {width, height} = size;

    if (this.props.onResize) {
      e.persist && e.persist();
      this.setState(size, () => this.props.onResize && this.props.onResize(e, data));
    } else {
      this.setState(size);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      this.setState({
        width: nextProps.width,
        height: nextProps.height
      });
    }
  }

  render(){
    // Basic wrapper around a Resizable instance.
    // If you use Resizable directly, you are responsible for updating the child component
    // with a new width and height.
    const {handleSize, onResize, onResizeStart, onResizeStop, draggableOpts,
         minConstraints, maxConstraints, lockAspectRatio, axis, width, height, ...props} = this.props;
    return (
      <Resizable
        handleSize={handleSize}
        width={this.state.width}
        height={this.state.height}
        onResizeStart={onResizeStart}
        onResize={this.onResize}
        onResizeStop={onResizeStop}
        draggableOpts={draggableOpts}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        lockAspectRatio={lockAspectRatio}
        axis={axis}
        >
        <div style={{width: this.state.width, height: this.state.height}} {...props} />
      </Resizable>
    );
  }
}

export default ResizableBox;
