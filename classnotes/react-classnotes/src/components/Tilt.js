import React from 'react';
import VanillaTilt from 'vanilla-tilt';

class Tilt extends React.Component {
    componentDidMount() {
        VanillaTilt.init(
            this.rootNode, 
            {
                max: 25,
                speed: 400,
                glare: true,
                'max-glare': 0.5
            }
        );
    }

    render() {
        const tiltRoot = {
            border: '1px solid black',
            padding: '10px',
            width: '400px',
            margin: '100px auto'
        };

        const tiltChild = {
            border: '1px solid red',
            padding: '20px'
        };

        return (
            <div ref={node => this.rootNode = node} style={tiltRoot}>
                <div style={tiltChild}>
                    <div {...this.props} />
                </div>
            </div>
        )
    }
}

export default Tilt;