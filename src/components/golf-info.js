import * as React from 'react';

function GolfInfo(props) {
  const {info,toggleDrawer} = props;
  const displayName = `${info.name}`;

  const image = () => {
    const image_path = "storage/image/" + info.image;
    return(
      <img width={240} src={image_path} />
    );
  }

  return (
    <div>
      <div>
        {displayName} |{' '}
        <a onClick={toggleDrawer(true,info.id)}>詳しく</a>
      </div>
      {image}
    </div>
  );
}

export default React.memo(GolfInfo);