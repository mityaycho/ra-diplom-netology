export function headerHiddenPanelProfileVisibility() {
  document
    .querySelector(".hidden-panel__basket")
    .classList.remove("hidden-panel__basket_visible");
  document
    .querySelector(".hidden-panel__profile")
    .classList.add("hidden-panel__profile_visible");
  if (document.querySelector(".header-main__pic_basket_menu_is-active")) {
    document
      .querySelector(".header-main__pic_basket_menu_is-active")
      .classList.toggle("header-main__pic_basket_menu_is-active");
    document
      .querySelector(".header-main__pic_profile_menu")
      .classList.toggle("header-main__pic_profile_menu_is-active");
  } else {
    document
      .querySelector(".header-main__hidden-panel")
      .classList.toggle("header-main__hidden-panel_visible");
    document
      .querySelector(".header-main__pic_profile_menu")
      .classList.toggle("header-main__pic_profile_menu_is-active");
  }
}

export function headerHiddenPanelBasketVisibility() {
  document
    .querySelector(".hidden-panel__profile")
    .classList.remove("hidden-panel__profile_visible");
  document
    .querySelector(".hidden-panel__basket")
    .classList.add("hidden-panel__basket_visible");
  if (document.querySelector(".header-main__pic_profile_menu_is-active")) {
    document
      .querySelector(".header-main__pic_basket_menu")
      .classList.toggle("header-main__pic_basket_menu_is-active");
    document
      .querySelector(".header-main__pic_profile_menu_is-active")
      .classList.toggle("header-main__pic_profile_menu_is-active");
  } else {
    document
      .querySelector(".header-main__hidden-panel")
      .classList.toggle("header-main__hidden-panel_visible");
    document
      .querySelector(".header-main__pic_basket_menu")
      .classList.toggle("header-main__pic_basket_menu_is-active");
  }
}

export function headerMainSearchVisibility() {
  document
    .querySelector(".header-main__search")
    .classList.toggle("header-main__search_active");
  document
    .querySelector(".header-main__pic_search")
    .classList.toggle("header-main__pic_search_is-hidden");
}

export function mainSubmenuVisibility(event) {
  if (event.currentTarget.classList.contains("main-menu__item")) {
    if (document.querySelector(".main-menu__item_active")) {
      document
        .querySelector(".main-menu__item_active")
        .classList.toggle("main-menu__item_active");
    }
    document
      .querySelector(".dropped-menu")
      .classList.add("dropped-menu_visible");
    event.currentTarget.classList.toggle("main-menu__item_active");
  } else {
    document
      .querySelector(".dropped-menu")
      .classList.remove("dropped-menu_visible");
    document
      .querySelector(".main-menu__item_active")
      .classList.toggle("main-menu__item_active");
  }
}

export function getFavorite(id) {
  let favorite = localStorage.getItem("favorite");
  if (!favorite) {
    localStorage.setItem("favorite", "[]");
    favorite = localStorage.getItem("favorite");
  }
  const parsed = JSON.parse(favorite);
  return id ? parsed.findIndex(i => i.id === id) + 1 : parsed;
}

export function setFavorite(id, products) {
  const parsed = getFavorite();
  if (!parsed) {
    localStorage.setItem("favorite", "[]");
    setFavorite(id, products);
    return;
  }
  const already = parsed.findIndex(i => i.id === Number(id));
  already !== -1
    ? parsed.splice(already, 1)
    : parsed.push(products.find(i => i.id === id));
  localStorage.setItem("favorite", JSON.stringify(parsed));
}
