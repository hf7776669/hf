import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default class Example extends React.Component {


  render() {
    const {activePage, fetchPage} = this.props;

    let pageArray      = [];

    const furtherPages = (page) => [
      page - 1,
      page,
      page + 1,
      Math.ceil((page + 2) / 5) * 5,
      Math.ceil((page + 7) / 10) * 10,
      Math.ceil((page + 17) / 50) * 50
    ];

    switch (true) {
      case(activePage < 6) :

        pageArray = [
          2, 3,
          ...furtherPages(5)
        ];
        break;
      case (activePage === 6):

        pageArray = [
          2, 4, 
          ...furtherPages(6)
        ];
        break;
      case (activePage < 17) :
        pageArray = [
          2,
          Math.floor((activePage - 2) / 5) * 5,
          ...furtherPages(activePage)
        ];
        break;
      default:
        pageArray = [
          Math.floor((activePage - 7) / 10) * 10,
          Math.floor((activePage - 2) / 5) * 5,
          ...furtherPages(activePage)
        ];
    }


    return (
        <Pagination>
          <PaginationItem active={activePage === 1}
                          onClick={() => fetchPage(1)}>
            <PaginationLink>
              First
            </PaginationLink>
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

        </Pagination>
    );
  }
}