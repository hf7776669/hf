import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {activePage, fetchPage} = this.props;
    console.log('page: ', activePage);
    return (
        <Pagination>
          <PaginationItem disabled={activePage == 1}>
            <PaginationLink previous onClick={() => fetchPage(activePage - 1)}/>
          </PaginationItem>
          <PaginationItem active={activePage == 1}>
            <PaginationLink onClick={() => fetchPage(1)}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem active={activePage == 2}>
            <PaginationLink onClick={() => fetchPage(2)}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem active={activePage == 3}>
            <PaginationLink onClick={() => fetchPage(3)}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem active={activePage == 4}>
            <PaginationLink onClick={() => fetchPage(4)}>
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem active={activePage == 5}>
            <PaginationLink onClick={() => fetchPage(5)}>
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={() => fetchPage(activePage + 1)}/>
          </PaginationItem>
        </Pagination>
    );
  }
}