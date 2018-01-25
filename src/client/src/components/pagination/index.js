import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default class Example extends React.Component {


  render() {
    const {activePage, fetchPage} = this.props;

    let pageArray = [];

    if (activePage <= 3) {
      for (let i = 1; i < 7; i++) {
        pageArray.push(i);
      }
    } else {
      for (let i = activePage - 2; i < activePage + 4; i++) {
        pageArray.push(i);
      }
    }

    return (
        <Pagination>
          <PaginationItem disabled={activePage === 1}
                          onClick={() => fetchPage(1)}>
            <PaginationLink>
              First
            </PaginationLink>
          </PaginationItem>

          <PaginationItem disabled={activePage === 1}>
            <PaginationLink previous onClick={() => fetchPage(activePage - 1)}/>
          </PaginationItem>

          {pageArray.map((i) => (
              <PaginationItem active={activePage === i} key={i}>
                <PaginationLink
                    onClick={() => fetchPage(i)}>{i}</PaginationLink>
              </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink next onClick={() => fetchPage(activePage + 1)}/>
          </PaginationItem>

          <PaginationItem disabled={activePage === 1}>
            <PaginationLink>Last</PaginationLink>
          </PaginationItem>
        </Pagination>
    );
  }
}