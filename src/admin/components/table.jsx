import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

export default class DataTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Table
        rowHeight={200}
        rowsCount={this.props.rows.length}
        width={5000}
        height={5000}
        headerHeight={50}>
        <Column
          header={<Cell>drakespeak</Cell>}
          cell={cellProps => (
            <Cell {...cellProps}>
              {this.props.rows[cellProps.rowIndex].body}
            </Cell>
          )}
          height={100}
          width={5000}
        />
      </Table>
    )
  }
}
