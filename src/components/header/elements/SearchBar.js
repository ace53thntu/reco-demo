import { AutoComplete, Button, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SHOP } from "../../../common/defines";
import { getProductsByCategory } from "../../../common/shopUtils";
import { useDebounce as useDebounceHook } from "../../../hooks/useDebounce";
import {
  setGlobalCategory,
  setGlobalSearch,
} from "../../../redux/actions/globalActions";
import { setSubCategory } from "../../../redux/actions/shopActions";

const FEATURE_ID = "806840f9-c271-498c-b606-60592bb047be";

function SearchBarMobile({ fillData, placeholder }) {
  const { Option } = Select;
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  const globalState = useSelector((state) => state.globalReducer);
  const [searchOptions, setSearchOptions] = React.useState([]);

  const debouncedSearchTerm = useDebounceHook(search, 300);

  useEffect(() => {
    dispatch(setGlobalSearch(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  // useEffect(() => {
  //   if (window.AicactusSDK?.getSearchData?.()) {
  //     async function init() {
  //       const res = await window.AicactusSDK.getSearchData(FEATURE_ID);
  //       if (res?.results && res?.results?.keyword_trends) {
  //         const { keyword_trends = [] } = res.results;
  //         const opts = keyword_trends.map((name) => ({
  //           value: name,
  //         }));
  //         setSearchOptions(opts);
  //       }
  //     }
  //     init();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (window.AicactusSDK?.getSearchData?.()) {
  //     if (debouncedSearchTerm) {
  //       async function searchProducts() {
  //         const res = await window.AicactusSDK.getFeatureById(
  //           FEATURE_ID,
  //           "keywords",
  //           {
  //             keywords: [debouncedSearchTerm],
  //           }
  //         );
  //         if (res?.data?.results?.data?.length) {
  //           const data = res.data.results.data;
  //           const opts = data.map(({ name }) => ({
  //             value: name,
  //           }));
  //           setSearchOptions(opts);
  //         }
  //       }
  //       searchProducts();
  //     } else {
  //       async function init() {
  //         const res = await window.AicactusSDK.getSearchData(FEATURE_ID);
  //         if (res?.results && res?.results?.keyword_trends) {
  //           const { keyword_trends = [] } = res.results;
  //           const opts = keyword_trends.map((name) => ({
  //             value: name,
  //           }));
  //           setSearchOptions(opts);
  //         }
  //       }
  //       init();
  //     }
  //   }
  // }, [debouncedSearchTerm]);

  const renderAutoFillItem = () => {
    let product = getProductsByCategory(fillData, globalState.category);
    const opts = product.map((item) => ({
      value: item.name,
    }));
    return opts;
  };
  const onSelectCateory = (value) => {
    dispatch(setGlobalCategory(value));
    dispatch(setSubCategory(""));
  };
  const openDropdownOption = (value) => {
    setShowDropdownOptions(true);
    setSearch(value);
  };
  const closeDropdownOption = () => {
    setShowDropdownOptions(false);
  };
  const onSelectOption = (value, option) => {
    setSearch(value);
    closeDropdownOption();
    if (value?.length) {
      router.push({
        pathname: "/",
        query: { q: value },
      });
    } else {
      router.push("/");
    }
  };
  const onSearch = () => {
    if (!search || search === "") {
      router.push("/");
    } else {
      router.push({
        pathname: "/",
        query: { q: search },
      });
    }
  };
  return (
    <div className="menu-search">
      <div className="menu-search__form">
        <Select
          className="menu-search__form-select"
          defaultValue={globalState.category}
          style={{ width: 150 }}
          onChange={onSelectCateory}
          value={globalState.category}
        >
          {SHOP.category.map((item, index) => (
            <Option key={index} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        <div className="menu-search__form-input">
          <AutoComplete
            allowClear
            // backfill={true}
            // open={showDropdownOptions}
            onSearch={openDropdownOption}
            onBlur={closeDropdownOption}
            onSelect={onSelectOption}
            // options={renderAutoFillItem()}
            options={searchOptions}
            placeholder={placeholder}
            // filterOption={(inputValue, option) =>
            //   option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
            //   -1
            // }
          />
          <Button onClick={onSearch}>
            <i className="icon_search" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SearchBarMobile);
