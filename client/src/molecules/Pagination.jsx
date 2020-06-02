import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

// create & use amount & on click props
const Pagination = ({
  totalRecords,
  itemPerPage,
  pageNeighbours,
  handlePageChange
}) => {
  const [pages, setPages] = useState(null)
  const currentPage = useRef(null)
  const totalPages = useRef(null)

  useEffect(() => {
    totalPages.current = Math.ceil(totalRecords / itemPerPage)
    currentPage.current = 1
    const pagesVal = fetchPageNumbers()
    setPages(pagesVal)
  }, [totalRecords, totalPages])

  const gotoPage = (page) => {
    currentPage.current = page
    handlePageChange(currentPage.current)
    const pagesVal = fetchPageNumbers()
    setPages(pagesVal)
  }

  const handleClick = (page) => (evt) => {
    evt.preventDefault()
    gotoPage(page)
  }

  const handleMoveLeft = (evt) => {
    evt.preventDefault()
    gotoPage(currentPage.current - pageNeighbours * 2 + 1)
  }

  const handleMoveRight = (evt) => {
    evt.preventDefault()
    gotoPage(currentPage.current + pageNeighbours * 2 - 1)
  }

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2
    if (totalPages.current > totalBlocks) {
      const startPage = Math.max(2, currentPage.current - pageNeighbours)
      const endPage = Math.min(
        totalPages.current - 1,
        currentPage.current + pageNeighbours
      )

      let pages = range(startPage, endPage)

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages.current - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages.current]
    }

    return range(1, totalPages.current)
  }

  return (
    <nav
      className='pagination is-centered is-small'
      role='navigation'
      aria-label='pagination'>
      <ul className='pagination-list'>
        {pages &&
          pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className='page-item'>
                  <a
                    className='pagination-link'
                    href='/'
                    aria-label='Previous'
                    onClick={handleMoveLeft}>
                    <span aria-hidden='true'>&laquo;</span>
                    <span className='sr-only'>Previous</span>
                  </a>
                </li>
              )

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className='page-item'>
                  <a
                    className='pagination-link'
                    href='/'
                    aria-label='Next'
                    onClick={handleMoveRight}>
                    <span aria-hidden='true'>&raquo;</span>
                    <span className='sr-only'>Next</span>
                  </a>
                </li>
              )

            return (
              <li
                key={index}
                className={`page-item${
                  currentPage.current === page ? ' active' : ''
                }`}>
                <a
                  className='pagination-link'
                  href='/'
                  onClick={handleClick(page)}>
                  {page}
                </a>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  itemPerPage: PropTypes.number,
  pageNeighbours: PropTypes.number,
  handlePageChange: PropTypes.func
}

export default Pagination
