import { Hit as AlgoliaHit } from '@algolia/client-search';
import React from 'react';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks';
import { cx } from '../utils/cx';


export type HitsProps<THit> = React.ComponentProps<'div'> &
    UseHitsProps & {
        hitComponent: (props: { hit: THit }) => JSX.Element;
    };

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
    hitComponent: Hit,
    ...props
}: HitsProps<THit>) {
    const { hits } = useHits(props);

    return (
        <div className={cx('py-5', props.className)}>
            <section className="grid grid-cols-3 gap-5">
                {hits.map((hit) => (
                    <div key={hit.objectID} className="ais-Hits-item">
                        <Hit hit={hit as unknown as THit} />
                    </div>
                ))}
            </section>
        </div>
    );
}
