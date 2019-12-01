import React from 'react';

class AppKeyDemo extends React.Component {
    state = {
        items: [],
        date: new Date(),
        dateString: new Date().toLocaleTimeString()
    };

    static allItems = [
        { id: 'a', value: 'apple' },
        { id: 'o', value: 'orange' },
        { id: 'g', value: 'grape' },
        { id: 'p', value: 'pear' }
    ];

    // The list of items that are rendered need a key attribute
    // This is because as React renders and re-renders this component, it needs to compare the old copy 
    // and the new copy of the allItems array to detect differences: which items were added, removed, 
    // modified etc. in order to correctly render the component out to the browser. So as to maintain
    // the right association between the rendered divs and the elements of the modified allItems array, 
    // it keeps track of this association using the key attribute.

    addItem = event => {
        this.setState(
            ({ items, dateString }) => (
                {
                    items: [
                        ...items,
                        AppKeyDemo.allItems.find(
                            item => !items.includes(item)
                        )
                    ]
                }
            ));
    }

    removeItem = it => {
        this.setState(({ items }) => {
            return {
                items: items.filter(item => {
                    return item !== it
                })
            }
        });
    }


    render() {
        return (
            <div>
                <button onClick={this.addItem}>
                    +  
                </button>
                <div>{this.state.dateString}</div>

                {
                    this.state.items.map((item, i) => {
                        return (
                            // Using the index (i) here won't work, since that relies on the order of the rendered divs
                            // to be the same as that of the items array in the state. In this example removing and adding
                            // items will change the order in which say the apple div will appear but if we use the index
                            // as the key, react will always fill the first  
                            // Here we should use item.id instead of i
                            <div key={item.id}>
                                <button onClick={(e) => this.removeItem(item)}>-</button>
                                {item.value}:
                                <input />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default AppKeyDemo;