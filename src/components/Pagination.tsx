import React from 'react';
import { usePagination, UsePaginationProps } from 'react-instantsearch-hooks';
import { cx } from '../utils/cx';
import { isModifierClick } from './isModifierClick';

export type PaginationProps = React.ComponentProps<'div'> & UsePaginationProps;

export function Pagination(props: PaginationProps) {
    const {
        refine,
        createURL,
        pages,
        currentRefinement,
        isFirstPage,
        isLastPage,
        nbPages,
        canRefine,
    } = usePagination(props);

    return (
        <div
            className={cx(
                'flex justify-center items-center',
                canRefine === false && 'ais-Pagination--noRefinement',
                props.className
            )}
        // className="flex justify-center items-center"
        >
            <ul className="flex gap-8 py-12">
                <PaginationItem
                    aria-label="First"
                    value={0}
                    isDisabled={isFirstPage}
                    createURL={createURL}
                    refine={refine}
                    className={cx(
                        'text-blue-500',
                        'ais-Pagination-item--firstPage'
                    )}
                >    ‹‹

                </PaginationItem>

                <PaginationItem
                    aria-label="Previous"
                    value={currentRefinement - 1}
                    isDisabled={isFirstPage}
                    createURL={createURL}
                    refine={refine}
                    className={cx(
                        'text-blue-500',
                        'ais-Pagination-item--previousPage'
                    )}
                >
                    ‹
                </PaginationItem>

                {pages.map((page) => (
                    <PaginationItem
                        key={page}
                        aria-label={String(page)}
                        value={page}
                        isDisabled={false}
                        createURL={createURL}
                        refine={refine}
                        className={cx(
                            'text-blue-500',
                            page === currentRefinement && 'text-green-800'
                        )}
                    >
                        {page + 1}
                    </PaginationItem>
                ))}

                <PaginationItem
                    aria-label="Next"
                    value={currentRefinement + 1}
                    isDisabled={isLastPage}
                    createURL={createURL}
                    refine={refine}
                    className={cx('text-blue-500')}
                >
                    ›
                </PaginationItem>

                <PaginationItem
                    aria-label="Last"
                    value={nbPages - 1}
                    isDisabled={isLastPage}
                    createURL={createURL}
                    refine={refine}
                    className={cx('text-blue-500')}
                >
                    ››
                </PaginationItem>
            </ul>
        </div>
    );
}

type PaginationItemProps = React.ComponentProps<'a'> &
    Pick<ReturnType<typeof usePagination>, 'refine' | 'createURL'> & {
        isDisabled: boolean;
        value: number;
    };

function PaginationItem(props: PaginationItemProps) {
    const { isDisabled, className, href, value, createURL, refine, ...rest } =
        props;

    if (isDisabled) {
        return (
            <li className={cx(className, 'ais-Pagination-item--disabled')}>
                <span className="ais-Pagination-link" {...rest} />
            </li>
        );
    }

    return (
        <li className={className}>
            <a
                className="ais-Pagination-link"
                href={createURL(value)}
                onClick={(event) => {
                    if (isModifierClick(event)) {
                        return;
                    }

                    event.preventDefault();
                    refine(value);
                }}
                {...rest}
            />
        </li>
    );
}
