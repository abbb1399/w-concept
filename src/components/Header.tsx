import { MenuIcon, PlayIcon } from "lucide-react";
import BrandIcon from "./icons/BrandIcon";
import { css } from "@emotion/react";
import { useState } from "react";
import { navData } from "../data/navData";

export default function Header() {
  const [hoveredCateIndex, setHoveredCateIndex] = useState(0);

  return (
    <>
      <header css={headerStyle}>
        <div className="container">
          <div className="brand-icon">
            <BrandIcon />
          </div>
          <nav className="header-nav">
            <div css={menuIcon} onMouseLeave={() => setHoveredCateIndex(0)}>
              <div className="menu-icon">
                <MenuIcon />
              </div>
              <div className="dropdown">
                <div className="dropdown-content">
                  <CateList
                    hoveredCateIndex={hoveredCateIndex}
                    setHoveredCateIndex={setHoveredCateIndex}
                  />
                  <AsideList />
                </div>
              </div>
            </div>
            <ul css={navMenu}>
              <li className="active">스프링아우터</li>
              <li>베스트</li>
              <li>세일</li>
              <li>신상</li>
              <li>추천</li>
              <li>단독</li>
              <li className="active">발견</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

const headerStyle = css`
  border-bottom: 1px solid rgb(238, 238, 238);

  .container {
    padding: 1rem 1.25rem;
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
  }

  .brand-icon {
    height: 2.25rem;
    display: flex;
    align-items: center;
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 22px;
    margin-top: 0.75rem;

    .menu-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 7px;
      border: 1px solid rgb(226, 226, 226);
      cursor: pointer;
    }
  }
`;

const menuIcon = css`
  &:hover {
    .dropdown {
      display: block;
    }
  }

  .dropdown {
    position: absolute;
    background-color: rgb(255, 255, 255);
    top: 121px;
    left: 0px;
    z-index: 2;
    width: 100%;
    display: none;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 28px;
      background: transparent;
      position: absolute;
      top: -28px;
      left: 0px;
    }

    .dropdown-content {
      position: relative;
      max-width: 1920px;
      margin: 0px auto;
      display: flex;
      flex-flow: row;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: stretch;
      align-items: stretch;
    }
  }
`;

const navMenu = css`
  display: inline-flex;
  gap: 14px;
  font-size: 17px;
  font-weight: 500;
  line-height: 130%;
  cursor: pointer;
  position: relative;

  .active::after {
    content: "";
    display: inline-block;
    border-radius: 50%;
    background-color: rgb(250, 85, 0);
    width: 4px;
    height: 4px;
    margin-left: 2px;
    transform: translateY(-12px);
  }
`;

type CateListProps = {
  hoveredCateIndex: number;
  setHoveredCateIndex: (index: number) => void;
};

function CateList({ hoveredCateIndex, setHoveredCateIndex }: CateListProps) {
  return (
    <div css={cateListContainer}>
      <ul className="list-dpt1">
        {navData.cateList.map((cateItem, cateIndex) => (
          <li
            key={cateIndex}
            onMouseEnter={() => setHoveredCateIndex(cateIndex)}
            className="list-item1"
          >
            <div
              css={cateListCaption(cateIndex, hoveredCateIndex === cateIndex)}
            >
              {cateItem.title}
              <PlayIcon
                className="play-icon"
                width={14}
                height={16}
                fill="#000"
              />
            </div>

            <ul css={cateListItem(hoveredCateIndex === cateIndex)}>
              {cateItem.categories.map((category, categoryIndex) => (
                <li className="item-list" key={categoryIndex}>
                  <div className="title">{category.title}</div>
                  <ul>
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

const cateListContainer = css`
  width: 100%;
  padding-left: 20px;

  .list-dpt1 {
    .list-item1 {
      overflow: hidden;
      display: flex;
      flex-flow: row;
      -webkit-box-pack: start;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`;

const cateListCaption = (cateIndex: number, isSame: boolean) => css`
  cursor: pointer;
  position: absolute;
  top: ${24 + cateIndex * 47}px;
  width: 132px;
  font-size: 17px;
  font-weight: 500;
  line-height: 17px;
  z-index: 2;
  background-color: rgb(255, 255, 255);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .play-icon {
    display: ${isSame ? "block" : "none"};
  }
`;

const cateListItem = (isSame: boolean) => css`
  display: ${isSame ? "flex" : "none"};
  gap: 56px 8px;
  flex-wrap: wrap;
  width: 100%;

  font-size: 14px;
  line-height: 18.2px;

  position: relative;
  padding: 24px 20px 40px;
  width: 100%;
  margin-left: 152px;
  max-width: 1040px;
  min-width: 1040px;

  @media (max-width: 1535px) {
    display: ${isSame ? "block" : "none"};
    margin-top: -56px;
    margin-left: 144px;
    min-width: 880px;
  }

  .item-list {
    @media (max-width: 1535px) {
      float: left;
      margin-top: 56px;
      margin-left: 8px;
    }

    width: 160px;

    .title {
      font-weight: 500;
      color: rgb(0, 0, 0);
      margin-bottom: 12px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    ul {
      color: rgb(119, 119, 119);
      display: flex;
      flex-direction: column;
      gap: 8px;

      li {
        cursor: pointer;

        &:hover {
          color: rgb(0, 0, 0);
        }
      }
    }
  }
`;

function AsideList() {
  return (
    <div css={asideList}>
      {navData.asideList.map((item, index) => (
        <div key={index} css={list}>
          <div className="title">{item.title}</div>
          <ul>
            {item.list.map((listItem, index) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const asideList = css`
  background-color: rgb(249, 249, 249);
  padding: 24px 20px 40px 36px;
  display: flex;
  flex-flow: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
  align-items: flex-start;
  column-gap: 8px;
  width: 100%;
  max-width: 707px;
  min-width: 321px;
`;

const list = css`
  font-size: 14px;
  line-height: 18.2px;
  width: 168px;

  .title {
    font-weight: 500;
    color: rgb(0, 0, 0);
    margin-bottom: 12px;
  }

  ul {
    color: rgb(119, 119, 119);
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      cursor: pointer;
      &:hover {
        color: rgb(0, 0, 0);
      }
    }
  }
`;
