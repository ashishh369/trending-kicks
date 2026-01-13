import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SneakerCard from './SneakerCard';

const SneakersGrid = ({ sneakers, onAddToCart, onViewDetails, hasMore, fetchMoreData, loading }) => (
  <section id="trending" className="sneakers-grid">
    <h2>Trending Now</h2>
    <InfiniteScroll
      dataLength={sneakers.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more sneakers!</p>}
    >
      <div className="grid">
        {sneakers.map(sneaker => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
        ))}
      </div>
    </InfiniteScroll>
  </section>
);

export default SneakersGrid;