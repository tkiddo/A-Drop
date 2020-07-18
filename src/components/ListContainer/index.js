import React from 'react';
// eslint-disable-next-line import/no-unresolved
import './index.scss';
import { connect } from 'react-redux';

const mapStateToProps = ({ markdown }) => ({
  markdown
});

const ListContainer = (props) => {
  const {
    match: { params },
    markdown: { all }
  } = props;
  const visiable = all.filter((item) => item.meta === params.filter);
  return (
    <>
      {visiable.map((item) => (
        <div key={item.title}>{item.title}</div>
      ))}
    </>
  );
};

export default connect(mapStateToProps)(ListContainer);
