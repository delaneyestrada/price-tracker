function productTemplate(O, M, Z, w, ac) {
    var B = O.price ? O.price : "",
        Q = T(O.price),
        z = B == "Email for Price" ? "emailPrice" : "",
        j = B == "Call for Price" ? "callForPrice" : "",
        s = B == "Add to Cart to see Price" ? "addToCartForPrice" : "",
        A = B.indexOf("Starting") > -1 ? "priceRange" : "",
        h, S = O.showQuickView == false,
        m = O.maxSavingsMSRP,
        e = T(O.maxSavingsMSRP),
        ai = O.maxSavingsPercent,
        af = parseInt(O.openBoxItemCount),
        J = af > 1 ? "+" : "",
        t = O.openBoxTextLinkPrice,
        U = O.openBoxTextLinkURL,
        C = parseInt(O.blemishedItemCount),
        c = C > 1 ? "+" : "",
        E = O.blemishedTextLinkPrice,
        b = O.blemishedTextLinkURL,
        a = O.path,
        X = parseInt(O.restockItemCount),
        N = X > 1 ? "+" : "",
        ae = O.restockTextLinkPrice,
        ah = O.restockTextLinkURL,
        D = O.skuCondition,
        W = O.storeName,
        K = O.storeId,
        f = O.sticker,
        g = O.stickerClass,
        Y = O.store,
        I = O.storeSeoUrl,
        l = S ? "" : "<span></span>",
        G = "#reviews",
        p = parseInt(O.reviews) > 0 ? "(" + O.reviews + ")" : "",
        H = $("#notDisplayProductRatingInfo").text() !== "true" && O.itemType != "Used" && O.itemType != "Vintage" ? '<div class="ratingReviewsDisplayLinks"><a href="' + (O.defaultSkuUrl ? O.defaultSkuUrl : a) + G + '"><span class="stars small rate-' + O.rating + '"></span></a><a href="' + (O.defaultSkuUrl ? O.defaultSkuUrl : a) + G + '">' + p + "</a></div>" : "",
        r = 75,
        v = O.name.replace('"', '"'),
        P = O.styleOptions.inCheckoutPromo,
        ab = "false",
        R, aa = P.indexOf("Open Box") === -1 ? '<dl><dt><a href="' + U + '">Open Box</a>: </dt><dd>' + t + J + "</dd></dl>" : '<dl><dt><a href="' + U + '">Open Box</a></dt><dd></dd></dl>',
        V = P.indexOf("Restock") === -1 ? '<dl><dt><a href="' + ah + '">Restock</a>: </dt><dd>' + ae + N + "</dd></dl>" : '<dl><dt><a href="' + ah + '">Restock</a></dt><dd></dd></dl>',
        q = P.indexOf("Blemished") === -1 ? '<dl><dt><a href="' + b + '">Blemished</a>: </dt><dd>' + E + c + "</dd></dl>" : '<dl><dt><a href="' + b + '">Blemished</a></dt><dd></dd></dl>';
    if (typeof P !== "undefined") {
        for (var ad = 0; ad < P.length; ad++) {
            if (P[ad].includes("site")) {
                ab = "true";
                break;
            }
        }
    }
    R = ab === "true" ? "inCheckoutPromo" : "";
    if (B) {
        if (ab === "false") {
            if (B.indexOf("Starting&nbsp;at") > -1) {
                var o = B.replace("Starting&nbsp;at ", '<span class="startingAt">From</span> ');
                B = o;
            } else {
                if (!z && !j && !s) {
                    B = B;
                }
            }
        } else {
            var d = B.replace(B, "See Checkout For Final Price");
            B = d;
        }
    }

    function u(ak) {
        var aj = document.createElement("textarea");
        ak = ak.replace(/&#92;/g, "");
        aj.innerHTML = ak;
        return aj.value;
    }
    var k = {
        savings: "",
        compare: $.facetBuilder.compareTemplate(O),
        header: '<a href="' + a + '">' + $.facetBuilder.truncate(O.name, r) + "</a>",
        openBoxTextLink: $.trim(t) && !F(t) && af > 0 ? aa : "",
        blemishedTextLink: $.trim(E) && !F(E) && C > 0 ? q : "",
        price: B ? '<span class="productPrice ' + z + " " + j + " " + s + " " + R + " " + A + '" aria-label="Product Price">' + B + "</span>" : '<span class="productPrice emptyPrice"></span>',
        monthlyPayments: O.easyPayOptions && pageData.isInternational !== "true" ? u(O.easyPayOptions) : "",
        productId: '<var class="hidden productId">' + O.productID + "</var>",
        restockTextLink: $.trim(ae) && !F(ae) && X > 0 ? V : "",
        reviews: H,
        savingsPercent: $.trim(ai) ? "&nbsp;(save&nbsp;" + ai + "%)" : "",
        skuCondition: $.trim(D) ? '<div class="productCondition">' + D + "</div>" : "",
        storeFinder: $.trim(K) ? '<div class="storeName"><var class="hidden locationId">' + K + '</var><a href="#" class="storeDisplayPop">' + W + "</a></div> " : "",
        sticker: f ? '<div class="stickerWrap"><div class="stickerText ' + g + '"><span>' + f + "</span></div></div>" : '<div class="productTag"></div>',
        thumb: '<div class="thumb"><a href="' + pageData.contextPath + (O.defaultSkuUrl ? O.defaultSkuUrl : a) + '"rel="' + pageData.contextPath + "/pdp/quickView.jsp?productId=" + O.productID + "&itemType=" + O.itemType + '" class="quickView prodThumb180"><img alt="' + v + '" class="lazy" data-original="' + O.thumb + '" src="' + pageData.styleStaticContentUrl + '/img/cmn/c.gif">' + l + '</a><button class="quickView screen-reader-only"> Open quick view dialog for ' + v + "</button> </div>",
        styles: '<div class="styles-carousel"><var class="stylesData hidden">' + JSON.stringify(O.styleOptions) + "</var></div>"
    };
    if (O.onsale === "true" && O.regularPrice && ab === "false") {
        var ag = ac.list !== "" ? ac.list : "Was:";
        k.savings = '<span class="maxSavingsMSRP">' + ag + "&nbsp;" + O.regularPrice + "</span>";
    }
    if (L(O)) {
        var ag = ac.list !== "" ? ac.list : "Was:";
        k.savings = '<span class="maxSavingsMSRP">' + ag + '&nbsp;<span aria-label="Was Price">' + MFI.NumberUtils.formatPrice(O.wasPrice, false) + "</span></span>";
    }
    $.facetBuilder.isDivisible(Z + 1, 4) ? (M = ' class="lastChild last-child"') : (M = "");
    h = '<li class="product-container"><div class="productItemWrapper"><div class="product">' + k.sticker + k.thumb + k.styles + '<div class="productDetails"><div class="productTitle">' + k.header + '</div><div class="priceContainer mainPrice">' + k.price + k.monthlyPayments + k.savings + "</div><div>" + k.reviews + '</div><div class="alternatePrices">' + k.restockTextLink + k.openBoxTextLink + k.blemishedTextLink + "</div>" + k.skuCondition + k.storeFinder + k.compare + k.productId + "</div></div></div></li>";

    function T(al) {
        if (typeof al === "undefined") {
            return 0;
        }
        var aj = $.trim(pageData.currencySymbol),
            am = new RegExp(aj + "|&nbsp;|,|\\$", "g");
        var ak = parseFloat($.trim(al.replace(am, "")));
        return isNaN(ak) ? 0 : ak;
    }

    function L(aj) {
        return (aj.priceDrop === "true" && aj.wasPrice && MFI.NumberUtils.isNumber(aj.wasPrice) && aj.salePrice && MFI.NumberUtils.isNumber(aj.salePrice) && aj.priceDropPrice && MFI.NumberUtils.isNumber(aj.priceDropPrice) && aj.onsale !== "true" && aj.wasPrice > aj.salePrice);
    }

    function F(ak) {
        var aj = pageData.currencySymbol + "0.00";
        return $.trim(ak) == aj;
    }
    return h;
}
GCI.digitalData.analyticsData = GCI.digitalData.analyticsData || {};
(function ($) {
    var settings = {
        json: pageData.contextPath + "/cartridges/ajax/leftNavJSON.jsp",
        facetJSON: pageData.contextPath + "/cartridges/ajax/facetSearch.jsp",
        showAllBrandsJSON: pageData.contextPath + "/ajax/showAllBrandFacets.jsp",
        facetContainer: "#facets .facetContainer",
        activeFacets: "#facets .activeFacets",
        ajaxDelay: 325,
        ajaxDelayIntent: 750,
        brandSearch: '<div class="textBox"><label class="inlineLabel" for="brandTypeAhead">Search Brands</label><input class="inlineLabel text" type="text" name="brandTypeAhead" id="brandTypeAhead" /></div>',
        brandSeeAll: '<div class="load-all-refinements--container brand"><a data-seeall="brand" class="load-all-refinements--link brand">See All</a></div>',
        priceRange: '<fieldset><label for="priceRangeFrom" class="inlineLabel">$ From</label><label for="priceRangeTo" class="inlineLabel">$ To</label><input maxlength="5" class="inlineLabel text" type="text" id="priceRangeFrom"> <span>to</span> <input maxlength="5" class="inlineLabel text" type="text" id="priceRangeTo"> <a id="setPriceRange" class="styleBtn gray">Set</a></fieldset>',
        browseTemplate: $("#browseTemplate").text().split("|"),
        productGridClass: pageData.siteName == "/gc" ? "" : "products",
        timer: 0,
        findInStoreFacetId: "1097",
        root: $("#facets"),
        sessionCacheDisabled: false,
        modernBrowser: false,
        triggeredByHash: false,
        queryStringVal: $("#queryString").text(),
        initialHash: "",
        lastFacetApplied: 0,
        unicaEnabled: 0,
        backLinks: pageData.siteName == "/gc" ? new setBackLinks() : null,
        allBrands: false,
        brandData: {
            hasMoreBrandFacets: false,
            facetContainer: ".facetContainer-brand",
            searchBox: "#brandTypeAhead",
            loadAllContainer: ".load-all-refinements--container.brand",
            loadAllBrandsLink: ".load-all-refinements--link.brand",
            brandList: [],
            listItems: $(),
            noAjax: false,
            len: 0
        }
    };
    $.fn.facetBuilder = function (options) {
        facetContainer = $(this);
        options = $.extend({}, settings, options);
        $.facetBuilder(facetContainer, options);
    };
    $.facetBuilder = function (facetContainer, options) {
        $.facetBuilder.options = $.extend({}, settings, options);
        facetData = {};
        if (pageData.endecaCookieSortEnabled != "true") {
            deleteCookie("dP");
        }
        $.facetBuilder.options.root = facetContainer;
        $.facetBuilder.modernBrowser();
        $.facetBuilder.setFacetIds();
        $.facetBuilder.handleClicks();
        $.facetBuilder.handleKeys();
        $($.facetBuilder.options.brandData.loadAllBrandsLink).on("click", function () {
            $.facetBuilder.seeAllBrandRefinements($(this), false);
            $(this).addClass("clicked");
        });
        $.facetBuilder.newPaginationObj();
        $.facetBuilder.initHashWatcher();
        $.facetBuilder.checkClearLinks();
        $.facetBuilder.initClearLinks();
        $(".searchPagination").on("click", "a", function () {
            $("body").attr("pagingSearchResults", "1");
        });
        if (pageData.siteName == "/gc") {
            $.facetBuilder.options.backLinks.storeCurrLocation();
            $.facetBuilder.injectPromoAds();
        }
        $.facetBuilder.updateRecCountOnH1();
    };
    $.extend($.facetBuilder, {
        facetAjax: function (url, query, facetId) {
            var container = $("#resultsContent");
            container.ajaxTransition({
                loadingGifID: "loadingGif",
                forceOpacityIE: "ol.products, .products .thumb",
                ajaxCallback: function () {
                    $.ajax({
                        type: "GET",
                        dataType: "text",
                        data: query,
                        cache: false,
                        url: url,
                        success: function (data) {
                            data = data.replace(/\r?\n|\r/g, "");
                            try {
                                data = eval("(" + data + ")");
                            } catch (e) {
                                clog("Error: could not parse Facet JSON response: " + e.message);
                                return;
                            }
                            if (!data.errors) {
                                $.facetBuilder.successfulQuery(data, query, facetId);
                                if (pageData.siteName == "/gc") {
                                    $.facetBuilder.injectPromoAds();
                                }
                            } else {
                                $.facetBuilder.parseErrors(data);
                            }
                        },
                        complete: function () {
                            $.ajaxTransition.postAjaxCall(container, {
                                loadingGifID: "loadingGif"
                            });
                            $.facetBuilder.updateAdvancedSearch();
                            globalDispatchEvent("ajaxPlpRefinement");
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            container.find("ol.products, .products .thumb").css("position", "relative");
                            clog("facetAjax Error (possibly from old url structure): ", xhr, textStatus, errorThrown);
                        }
                    });
                }
            });
            var navState = getQueryStringParam("N", query);
            $("#navState").text(navState);
            var pg = getQueryStringParam("gP", query);
            if (parseInt(pg) > 1) {
                $(document).trigger("omnitureEvent", ["Paging", true, {
                    linkTrackVars: "prop14,prop15,prop16",
                    prop14: omniturePageName,
                    prop15: "page " + pg,
                    prop16: omniturePageType
                }]);
            }
        },
        successfulQuery: function (data, query, facetId) {
            GCI.digitalData.omnitureData = GCI.digitalData.omnitureData || {};
            if ($.facetBuilder.options.modernBrowser) {
                try {
                    sessionStorage[query] = JSON.stringify(data);
                } catch (e) {
                    clog("Error: Unable to cache response: " + e.message);
                }
            }
            if ($.facetBuilder.triggeredByHash) {
                $.facetBuilder.setHash(query);
            } else {
                $.facetBuilder.setHash(query, true);
            }
            $.facetBuilder.buildFacets(data, query, facetId);
            $(document).trigger("criteoFire", ["browse"]);
            if (data.omnitureReportingData) {
                var linkTrackVars = [],
                    omnitureEventData = {
                        linkTrackVars: ""
                    };
                for (var attrname in data.omnitureReportingData) {
                    if (attrname.indexOf("events") > -1) {
                        omnitureEventData.linkTrackEvents = data.omnitureReportingData[attrname];
                        linkTrackVars.push("events");
                    } else {
                        if (attrname.indexOf("eVar") > -1 || attrname.indexOf("prop") > -1) {
                            linkTrackVars.push(attrname);
                        }
                    }
                    omnitureEventData[attrname] = data.omnitureReportingData[attrname];
                }
                omnitureEventData.linkTrackVars = linkTrackVars.join(",");
                var eventName = "Refinements";
                var trackAsPageLoad = parseInt($("body").attr("pagingSearchResults")) == 1;
                if (!omnitureEventData.pageName && trackAsPageLoad) {
                    omniturePageName = GCI.digitalData.omnitureData.pageName || {};
                    omnitureEventData.pageName = omniturePageName;
                    omnitureEventData.prop14 = omniturePageName;
                    eventName = omniturePageName;
                }
                if (omnitureEventData.pageName && !omnitureEventData.prop7 && window.omniturePageType) {
                    linkTrackVars.push("prop7");
                    omnitureEventData.prop7 = "[" + pageData.siteName.replace("/", "") + "] " + omniturePageType;
                    omnitureEventData.prop16 = omnitureEventData.prop7;
                }
                $(document).trigger("omnitureEvent", [eventName, true, omnitureEventData, trackAsPageLoad]);
            }
            $("body").attr("pagingSearchResults", "0");
            $("#compareForm .pager, #compareForm fieldset.view").show();
        },
        parseErrors: function (data) {
            var errors = data.errors[0].messaging,
                markup = [];
            for (i = 0; i < errors.length; i++) {
                markup.push("<li>" + errors[i] + "</li>");
            }
            $("#resultsContent").html('<div id="JSON_NoResults"><h4>No Matching Products: </h4><ul>' + markup.join("") + "</ul></div>");
            facetData.errors = 1;
            facetData.processing = false;
            $("#compareForm .pager, #compareForm fieldset.view").hide();
        },
        returnFromErrorState: function () {
            if (facetData.errors > 0) {
                facetData.errors = 0;
                $("#compareForm .pager, #compareForm fieldset.view").show();
            }
        },
        buildFacets: function (data, query, facetId) {
            $.facetBuilder.options.lastFacetApplied = facetId;
            $.facetBuilder.options.updated = [];
            try {
                $.facetBuilder.options.brandData.hasMoreBrandFacets = data.hasMoreBrandFacets;
            } catch (e) {
                clog("buildFacets: error setting hasMoreBrandFacets: " + e.message);
            }
            $.facetBuilder.buildCategories(data.categories, data.params);
            $.facetBuilder.parseFacets(data, facetId);
            $.facetBuilder.buildPagers(data);
            $.facetBuilder.buildFacetObj(data);
            $.facetBuilder.renderProducts(data.products, data.pagination[0].view);
            if (MFI.CompareItemsContainer) {
                MFI.CompareItemsContainer.enableOrDisableAvailableProducts();
            }
            $.facetBuilder.activeFacets(facetId);
            $.facetBuilder.updateBrands();
            $.facetBuilder.returnFromErrorState();
            $.facetBuilder.checkClearLinks();
            facetData.processing = false;
            $(document).trigger("gridRendered");
        },
        buildFacetObj: function (data) {
            if (data.facets.length) {
                facetData.facets = data.facets;
            }
            facetData.errors = 0;
            facetData.products = data.products;
            facetData.pagination = data.pagination[0];
            facetData.sortBy = data.sortBy;
        },
        setFacetIds: function () {
            facetData.brandFacetId = $(".facetBody.brand").data("dimension");
            facetData.priceFacetId = $(".facetBody.price").data("dimension");
            facetData.catFacetId = $(".facetBody.category").data("dimension");
        },
        buildCategories: function (categories, params) {
            var categoryList = $("#categoryList"),
                len = typeof categories == "object" && categories.length ? categories.length : 0,
                browseTemplate = $.facetBuilder.options.browseTemplate[0],
                list = [],
                exclude = ["Nao"];
            switch (browseTemplate) {
                case "brand":
                    exclude.push("brandId");
                    break;
                case "cat":
                    exclude.push("catId");
                    break;
            }
            var srcFacetTrail = $.facetBuilder.objectToQueryString(params, "param", "value", exclude);
            if (browseTemplate === "cat" || browseTemplate === "used" || browseTemplate === "dc" || browseTemplate === "pc") {
                if (len == 0) {
                    var subCategoryLabel = "";
                    switch (pageData.siteName) {
                        case "/mf":
                            subCategoryLabel = "subcategories";
                            break;
                        case "/wwbw":
                            subCategoryLabel = "subsections";
                            break;
                        case "/m123":
                            subCategoryLabel = "categories";
                            break;
                        default:
                            subCategoryLabel = "categories";
                            break;
                    }
                    list.push('<li class="no-further-refinements">No further ' + subCategoryLabel + " found.</li>");
                } else {
                    for (i = 0; i < len; i++) {
                        list.push($.facetBuilder.renderLinkItem(categories[i].url, "", categories[i].displayName, categories[i].dimVal, categories[i].count, false));
                    }
                }
                categoryList.html(list.join(""));
            }
        },
        renderLinkItem: function (url, queryString, name, dimVal, count, selected) {
            var selectedClass = selected ? "active" : "inactive",
                nameDisplay = name.replace("&nbsp;", " "),
                countDisplay = count ? " (" + count + ")" : "",
                ariaCountDisplay = count ? count : "Displaying",
                queryString = queryString ? "?" + queryString : "";
            return ('<li class="' + selectedClass + '"><a  aria-label="' + ariaCountDisplay + " results for " + nameDisplay + '" class="facetLink" rel="' + dimVal + '" href="' + pageData.contextPath + url + queryString + '">' + nameDisplay + countDisplay + "</a></li>");
        },
        brandPath: function () {
            var explicitBrand = getQueryStringParam("brandId", window.location.search),
                pathname = window.location.pathname.replace(pageData.contextPath, "");
            if (explicitBrand) {
                return pathname + "?brandId=" + explicitBrand;
            } else {
                return pathname;
            }
        },
        parseFacets: function (data, facetId) {
            var facets = data.facets,
                len = facets.length,
                activeFacets = $.facetBuilder.facetIdArray();
            $.facetBuilder.removeInactiveFacets(facets, activeFacets);
            var alwaysShowFacetId = $(".facetBody.alwaysShow").data("dimension"),
                facetIdArray = $(facets).map(function (index, facet) {
                    return Number(facet.facetId);
                }),
                factorAlwaysShowForOrder = alwaysShowFacetId && !$.inArray(alwaysShowFacetId, facetIdArray);
            for (i = 0; i < len; i++) {
                var subFacetsAvailable = facets[i].methods ? $(facets[i].methods).filter(function () {
                    return this.submethods && this.submethods.length > 0;
                }).length : 0;
                if (facetId != facets[i].facetId && facets[i].facetId == $.facetBuilder.options.findInStoreFacetId) {
                    $.facetBuilder.renderStoreFacet(facets[i], i, activeFacets, data.params, factorAlwaysShowForOrder);
                } else {
                    if (facets[i].facetId != $.facetBuilder.options.findInStoreFacetId && (facetId != facets[i].facetId || !facets[i].selected || subFacetsAvailable)) {
                        $.facetBuilder.renderFacets(facets[i], i, activeFacets, data.params, factorAlwaysShowForOrder);
                    }
                }
            }

            function loadConditionTooltip(html) {
                $("#facets .conditionTooltipWrap").html(html);
                $(".tooltipContainer.moreInfoTooltip").remove();
                $(".conditionTooltipWrap .tooltipTrigger").tooltip();
            }
            if (window.conditionTooltipHtml) {
                loadConditionTooltip(window.conditionTooltipHtml);
            } else {
                if (pageData.siteName == "/gc") {
                    $.ajax({
                        url: "/cartridges/includes/navigation/conditionTooltip.jsp",
                        type: "GET",
                        cache: true,
                        success: function (html) {
                            window.conditionTooltipHtml = html;
                            loadConditionTooltip(html);
                        }
                    });
                }
            }
            $(".load-all-refinements--link.brand").on("click", function () {
                $.facetBuilder.seeAllBrandRefinements($(this), false);
                $(this).addClass("clicked");
            });
            $($.facetBuilder.options.facetContainer).find(".inlineLabel").inlineLabel();
        },
        getFacetMarkupArray: function (facet) {
            var markupArray = [],
                facetLength = facet.methods.length;
            for (x = 0; x < facetLength; x++) {
                var method = facet.methods[x],
                    activeFacet = method.selected,
                    facetName = facet.facetName ? facet.facetName.split(" ").join("-").toLowerCase() : "",
                    dimensionName = facet.dimensionName ? facet.dimensionName : "";
                if (activeFacet) {
                    $.facetBuilder.updateAdvancedSearch(method.displayValue, activeFacet);
                }
                if (facet.seoFacet) {
                    markupArray.push($.facetBuilder.renderLinkItem(method.seoURL, "", method.displayValue, method.facetValue, method.itemCount, activeFacet));
                } else {
                    markupArray.push($.facetBuilder.renderSelections(method, activeFacet));
                }
                var subMethodsLength = method.submethods ? method.submethods.length : 0;
                if (subMethodsLength && activeFacet) {
                    var subMenuSelections = [];
                    for (y = 0; y < subMethodsLength; y++) {
                        var subMenuItem = method.submethods[y];
                        subMenuSelections.push($.facetBuilder.renderSelections(subMenuItem, subMenuItem.selected));
                    }
                    markupArray.push('<div id="facetBody_' + facet.facetId + '" class="facetBody ' + facetName + " " + facet.displayStyle + " " + dimensionName + ' subFacets"><div id="facetCont_' + facet.facetId + '" class="facetContainer facetContainer-' + dimensionName + ' clearfix"><ul id="facet_' + facet.facetId + '" class="facets">' + subMenuSelections.join("") + "</ul></div></div>");
                }
            }
            return markupArray;
        },
        updateAdvancedSearch: function (displayValue, active) {
            if (typeof toggleCheckboxes == "function") {
                toggleCheckboxes(displayValue, active);
            }
        },
        activateStoreFacetIfNecessary: function (stores, params, storeCheckBox, storeContainer) {
            var selectStoreCheckbox = false;
            if (stores && stores.length) {
                var nParamObject = $(params).filter(function (index, obj) {
                        if (obj.param == "N") {
                            return obj;
                        }
                    }),
                    nParam = nParamObject && nParamObject.length ? nParamObject[0].value : "";
                $(stores).each(function () {
                    if (this.selected && nParam.indexOf(this.facetValue) > -1) {
                        selectStoreCheckbox = true;
                        return false;
                    }
                });
            }
            if (selectStoreCheckbox) {
                storeCheckBox.find("li").removeClass("inactive").addClass("active");
                storeContainer.find(".facetContainer").show();
            }
        },
        renderStoreFacet: function (facet, facetIndex, activeFacets, params, factorAlwaysShowForOrder) {
            var storeFacetParent = $("#facetBody_" + facet.facetId),
                storeParamEl = storeFacetParent.find("#searchStoreParam"),
                newDistance = getQueryStringParam("radius", window.location.hash),
                newPostalCode = getQueryStringParam("postalCode", window.location.hash),
                noStoresEnabled = true;
            $(facet.methods).each(function () {
                if (this.disabled == false) {
                    noStoresEnabled = false;
                }
            });
            $.facetBuilder.activateStoreFacetIfNecessary(facet.methods, params, storeParamEl, storeFacetParent);
            if (newDistance) {
                storeParamEl.find(".radius").text(newDistance);
                storeParamEl.find("#distance").val(newDistance);
            }
            if (newPostalCode) {
                storeParamEl.find("#postalCode").val(newPostalCode);
            }
            if (noStoresEnabled) {
                $("#facet_" + facet.facetId).html("<li class='no-stores-msg'>No stores found with matching products.</li>");
            } else {
                $.facetBuilder.renderFacets(facet, facetIndex, activeFacets, params, factorAlwaysShowForOrder);
            }
        },
        renderFacets: function (facet, facetIndex, activeFacets, params, factorAlwaysShowForOrder) {
            var selections = [],
                position = $.inArray(facet.facetId, activeFacets);
            selections = $.facetBuilder.getFacetMarkupArray(facet);
            $.facetBuilder.options.updated.push(facet.facetId);
            var thisFacet = $.facetBuilder.getFacetBodyMarkup(facet, selections);
            if (position >= 0) {
                var isTheStoreFacet = facet.facetId == $.facetBuilder.options.findInStoreFacetId;
                if (isTheStoreFacet) {
                    $("#facet_" + facet.facetId).replaceWith($.facetBuilder.getFacetSelectionMarkup(facet, selections));
                } else {
                    $("#facetBody_" + facet.facetId).replaceWith(thisFacet);
                }
            } else {
                var nextFacet;
                if (factorAlwaysShowForOrder) {
                    nextFacet = $("#facets > div:not(.alwaysShow):eq(" + (facetIndex - 1) + ")");
                } else {
                    nextFacet = $("#facets > div:eq(" + facetIndex + ")");
                }
                nextFacet && nextFacet.length ? $(thisFacet).insertBefore(nextFacet) : $("#facets").append(thisFacet);
            }
        },
        getFacetBodyMarkup: function (facet, selections) {
            var html = "",
                radio = $.facetBuilder.radio(facet),
                addtlContentTop = $.facetBuilder.specialContent(facet, 1),
                addtlContentBottom = $.facetBuilder.specialContent(facet, 2),
                facetName = facet.facetName ? facet.facetName.split(" ").join("-").toLowerCase() : "",
                dimensionName = facet.dimensionName ? facet.dimensionName : "",
                fBodyClass = facet.seoFacet ? "nonajax" : "ajax",
                facetExpandedBoolean = facet.displayStyle ? "false" : "true",
                facetHiddenBoolean = facet.displayStyle ? "true" : "false",
                conditionTooltip = pageData.siteName == "/gc" && facet.facetName == "Condition" ? '<span class="conditionTooltipWrap"></span>' : "",
                m123ClearLink = "",
                mfClearLink = "";
            if (pageData.siteName == "/m123") {
                m123ClearLink = $.facetBuilder.renderClearLink(facet.selected, facet);
            } else {
                mfClearLink = $.facetBuilder.renderClearLink(facet.selected, facet);
            }
            html = '<div id="facetBody_' + facet.facetId + '" class="facetBody ' + facetName + " " + fBodyClass + " " + facet.displayStyle + " " + dimensionName + '"><strong><button class="facetExpander" aria-expanded="' + facetExpandedBoolean + '" aria-controls="facetCont_' + facet.facetId + '"><span class="facetArrow"> </span> <p class="facet-expander-header">' + facet.facetName + "</p></button> " + conditionTooltip + mfClearLink + '</strong><div aria-expanded="' + facetExpandedBoolean + '" aria-hidden="' + facetHiddenBoolean + '" id="facetCont_' + facet.facetId + '" class="facetContainer clearfix facetContainer-' + facet.dimensionName + '"><var class="hidden facetId">' + facet.facetId + "</var>" + m123ClearLink + '<a href="#" role="button" class="closeButton"><span class="screen-reader-only">Close Expanded Facet Container</span> </a>' + addtlContentTop + $.facetBuilder.getFacetSelectionMarkup(facet, selections) + addtlContentBottom + "</div></div>";
            return html;
        },
        getFacetSelectionMarkup: function (facet, selections) {
            var radio = $.facetBuilder.radio(facet),
                loadClass = "";
            if (facet.methods.length <= 10) {
                if (facet.dimensionName == "brand") {
                    loadClass = " initial-load";
                }
            } else {
                loadClass = " overflow-facet";
            }
            return ('<ul id="facet_' + facet.facetId + '" class="facets' + radio + loadClass + '">' + selections.join("") + "</ul>");
        },
        radio: function (facet) {
            return facet.multiSelect && facet.seoFacet != true ? "" : " radio";
        },
        specialContent: function (facet, pos) {
            var addtlContent = "";
            switch (Number(facet.facetId)) {
                case facetData.brandFacetId:
                    if (pos == 1) {
                        var loadingBlocker = pageData.siteName === "/gc" || pageData.siteName === "/mf" ? '<div class="facet-loading-blocker"></div>' : "";
                        addtlContent = loadingBlocker + $.facetBuilder.options.brandSearch;
                    }
                    if (pos == 2) {
                        if ($.facetBuilder.options.brandData.hasMoreBrandFacets == true && !$(".facetBody.brands").find("li.active").length) {
                            addtlContent = $.facetBuilder.options.brandSeeAll;
                        }
                    }
                    break;
                case facetData.priceFacetId:
                    if (pos == 2) {
                        addtlContent = $.facetBuilder.options.priceRange;
                    }
                    break;
            }
            return addtlContent;
        },
        renderSelections: function (selection, checked) {
            checked ? (checkedClass = "active") : (checkedClass = "inactive");
            selection.disabled ? (disabled = "disabled") : (disabled = "");
            selection.displayValue ? (displayValue = selection.displayValue.replace("&nbsp;", " ")) : (displayValue = selection.facetValue.replace("&nbsp;", " "));
            selection.itemCount ? (countDisplay = " (" + selection.itemCount + ")") : (countDisplay = "");
            selection.itemCount ? (ariaCountDisplay = selection.itemCount) : (ariaCountDisplay = "Displaying");
            if (countDisplay.toLocaleLowerCase().indexOf("mile") != -1) {
                checkedStateValue = "";
            } else {
                checkedStateValue = "";
            }
            return ('<li class="' + checkedClass + '"><label for="' + selection.facetValue + '"><span class="checkbox-facet ' + disabled + '"><input ' + checkedStateValue + ' id="' + selection.facetValue + '" type="checkbox" class="facetLink ' + disabled + '" rel="' + selection.facetValue + '" /><i aria-label="' + ariaCountDisplay + " results for " + displayValue + '">' + displayValue + countDisplay + "</i></span></label></li>");
        },
        activeFacets: function (facetId) {
            var facets = $($.facetBuilder.options.facetContainer),
                len = facets.length;
            $($.facetBuilder.options.activeFacets).remove();
            for (i = 0; i < len; i++) {
                var currentFacet = facets.eq(i),
                    currentFacetId = currentFacet.attr("id").replace("facetCont_", ""),
                    hasActive = currentFacet.find(".active").length;
                if (hasActive) {
                    currentFacet.closest(".facetBody").append('<ul class="activeFacets" id="activeFacets_' + currentFacetId + '">' + $.facetBuilder.buildActiveFacet(currentFacet, hasActive, currentFacetId) + "</ul>");
                }
            }
        },
        buildActiveFacet: function (facet, activeLen, facetId) {
            var activeFacets = facet.find(".active"),
                markup = [],
                thisFacet = activeFacets.eq(0),
                updated = $.inArray(facetId, $.facetBuilder.options.updated) >= 0,
                isASubFacet = facet.parent().hasClass("subFacets"),
                isTheStoreFacet = facetId == $.facetBuilder.options.findInStoreFacetId,
                isASubFacetParent = facet.find(".subFacets").length;
            if (pageData.siteName == "/m123") {
                for (n = 0; n < activeLen; n++) {
                    var thisFacet = activeFacets.eq(n),
                        link = thisFacet.find(".facetLink"),
                        value = link.attr("rel"),
                        text = $.trim(thisFacet.text()),
                        safeText = $("<div/>").text(text).html(),
                        href = link.attr("href");
                    if (!href) {
                        markup.push('<li><div  class="facetLink" rel="' + value + '">' + safeText + "</div></li>");
                    } else {
                        markup.push('<li><a class="facetLink" rel="' + value + '" href="' + href + '">' + safeText + "</a></li>");
                    }
                }
            }
            if (!thisFacet.hasClass("customPrice") && pageData.siteName != "/m123" && (updated || isASubFacetParent) && !isASubFacet && !isTheStoreFacet) {
                markup.push('<li class="openFacets"><a class="view-all">View All</a></li>');
            }
            return markup.join("");
        },
        facetIdArray: function () {
            var currentFacets = $("#facets .facetBody"),
                facetLength = currentFacets.length,
                arr = [];
            for (i = 0; i < facetLength; i++) {
                arr.push(currentFacets.eq(i).attr("id").replace("facetBody_", ""));
            }
            return arr;
        },
        responseFacetsIdArray: function (facets) {
            var len = facets.length,
                arr = [];
            for (i = 0; i < len; i++) {
                arr.push(facets[i].facetId);
            }
            return arr;
        },
        removeInactiveFacets: function (facets, activeFacets) {
            var resFacets = $.facetBuilder.responseFacetsIdArray(facets),
                len = activeFacets.length;
            for (i = 0; i < len; i++) {
                var position = $.inArray(activeFacets[i], resFacets);
                if (position < 0) {
                    var facetBody = $("#facetBody_" + activeFacets[i]);
                    if (!facetBody.hasClass("alwaysShow")) {
                        facetBody.remove();
                    }
                }
            }
        },
        objectToQueryString: function (obj, key, value, exclude) {
            var len = obj.length,
                arr = [];
            for (i = 0; i < len; i++) {
                var excludeItem = $.inArray(obj[i][key], exclude) >= 0;
                if (!excludeItem) {
                    arr.push(obj[i][key] + "=" + obj[i][value]);
                }
            }
            return arr.join("&");
        },
        handleClicks: function () {
            GCI.digitalData.analyticsData.faceting = GCI.digitalData.analyticsData.faceting || {};
            $(document).on("click", $.facetBuilder.options.facetContainer + " li .facetLink", function (e) {
                $.facetBuilder.changeTabs();
                var clicked = $(this),
                    fBody = clicked.closest(".facetBody"),
                    active = !clicked.hasClass("disabled"),
                    targetEl = clicked.parents("li"),
                    facetId = fBody.attr("id").replace("facetBody_", ""),
                    facetName = fBody.find(".facet-expander-header").text(),
                    facetValue = targetEl.text().replace(/\s*\(.*?\)\s*/g, "").trim();
                if (active) {
                    if (!fBody.hasClass("nonajax")) {
                        e.preventDefault();
                        $.facetBuilder.options.lastClicked = clicked;
                        if (facetId == facetData.brandFacetId) {
                            $.facetBuilder.options.brandData.listItems.removeClass("hidden");
                        }
                        var facetActivated = {
                            refinementName: facetName,
                            refinementValue: facetValue
                        };
                        GCI.digitalData.analyticsData.faceting.activatedFacet = facetActivated;
                        facetData.pagination.currentPage = 1;
                        $.facetBuilder.updateSelection(targetEl);
                        $.facetBuilder.fireQuery(facetId);
                    } else {
                        if (clicked.parent().hasClass("active")) {
                            e.preventDefault();
                        }
                    }
                }
            });
            $(document).on("click", "a.facetLink", function (e) {
                var clicked = $(this),
                    clickedHref = clicked.attr("href"),
                    fBody = clicked.closest(".facetBody"),
                    parentUl = clicked.closest(".facets");
                var radio = parentUl.hasClass("radio"),
                    currentlySelected = clicked.parent().hasClass("active"),
                    isNonajax = fBody.hasClass("nonajax");
                if (clickedHref && parentUl.find("li").length > 1 && !(radio && currentlySelected && isNonajax)) {
                    parentUl.find("a.facetLink").removeClass("clicked");
                    parentUl.find(".active a.facetLink").addClass("unclicked");
                    clicked.attr("href", clickedHref + "#narrowSideBar");
                    clicked.addClass("clicked");
                }
            });
            $(document).on("click", "a.dimensionLink", function (e) {
                var clicked = $(this),
                    clickedHref = clicked.attr("href");
                if (clickedHref) {
                    clicked.attr("href", clickedHref + "#narrowSideBar");
                    clicked.addClass("clicked");
                }
            });
            $(document).on("click", $.facetBuilder.options.activeFacets + " .facetLink", function (e) {
                if (!$(this).attr("href")) {
                    e.preventDefault();
                    var clicked = $(this),
                        value = clicked.attr("rel"),
                        facet = clicked.closest(".facetBody").find('.facetContainer .facetLink[rel="' + value + '"]');
                    facet.click();
                }
            });
            $(document).on("click", "#setPriceRange", function () {
                var els = $("#priceRangeFrom, #priceRangeTo"),
                    priceRange = new Array(els.eq(0).val(), els.eq(1).val()),
                    validRange = $.facetBuilder.validRange(priceRange, els);
                if (validRange) {
                    facetData.pagination.currentPage = 1;
                    typeof validRange == "object" || typeof validRange == "array" ? (priceRange = validRange) : (priceRange = priceRange);
                    $.facetBuilder.customPriceRange(priceRange);
                }
            });
            $.facetBuilder.options.root.delegate(".clearFacets", "click", function (e) {
                e.stopPropagation();
                var clicked = $(this),
                    facetContainer = clicked.closest(".facetBody").find(".facetContainer"),
                    facetId = facetContainer.attr("id").split("facetCont_")[1],
                    activeFacets = facetContainer.find(".active").not(".subFacets .active"),
                    len = activeFacets.length,
                    iterator = 0;
                if (clicked.attr("href")) {
                    return;
                }
                for (; iterator < len; iterator++) {
                    $.facetBuilder.updateSelection(activeFacets.eq(iterator));
                }
                if (iterator > 0) {
                    facetData.pagination.currentPage = 1;
                    $.facetBuilder.fireQuery(facetId);
                }
            });
            $(document).on("click", "#clearAllFacets", function (e) {
                if ($(this).attr("href") === "#") {
                    e.preventDefault();
                    $($.facetBuilder.options.facetContainer).find(".active").removeClass("active").addClass("inactive");
                    $.facetBuilder.fireQuery();
                }
            });
            $(document).on("click", "#allBrandsLink", function () {
                $.facetBuilder.options.allBrands = true;
            });
            $.facetBuilder.options.root.delegate(".activeFacets .openFacets a", "click", function (e) {
                e.preventDefault();
                var el = $(this),
                    parentFacet = el.closest(".facetBody"),
                    facetId = parentFacet.attr("id").replace("facetBody_", ""),
                    facetIdsToExclude = parentFacet.find("[rel]").map(function () {
                        return $(this).attr("rel");
                    }),
                    query = $.facetBuilder.serializeActive(facetId, facetIdsToExclude),
                    container = el.closest(".activeFacets").siblings(".facetContainer");
                if ((pageData.siteName == "/gc" || pageData.siteName == "/mf") && parentFacet.hasClass("brands")) {
                    $.facetBuilder.seeAllBrandRefinements(el, false);
                } else {
                    $.facetBuilder.singleFacetQuery(container, query, facetId);
                }
            });
        },
        singleFacetQuery: function (container, query, facetId) {
            var facets = container.find(".facets").not(function () {
                var subFacets = container.find(".subFacets");
                return (subFacets.length && $.contains(container.find(".subFacets")[0], this));
            });
            if (pageData.siteName == "/m123") {
                var loading = '<li class="loading">Loading</li>';
                facets.find("li").hide();
                facets.append(loading);
            }
            $.ajax({
                type: "GET",
                dataType: "json",
                data: query,
                cache: false,
                url: $.facetBuilder.options.facetJSON,
                success: function (data) {
                    $.facetBuilder.repopulateFacet(data, facetId, facets);
                    $.facetBuilder.updateBrands(data);
                    container.parent().find(".openFacets").remove();
                },
                error: function (xhr, textStatus, errorThrown, facetData) {
                    clog("Error: ", xhr, textStatus, errorThrown);
                    facets.find(".loading").remove();
                    facets.find("li").show();
                }
            });
        },
        repopulateFacet: function (data, facetId, facetElement) {
            var facet = data && data.facets ? data.facets[0] : {},
                facetLength = facet.methods ? facet.methods.length : 0,
                activeFacets = $.facetBuilder.facetActiveSelections(facetElement),
                markupArray = [];
            for (var x = 0; x < facetLength; x++) {
                var method = facet.methods[x],
                    activeFacet = false;
                if ($.inArray(method.facetValue, activeFacets) >= 0) {
                    if (pageData.siteName === "/m123") {
                        activeFacet = true;
                        markupArray.push($.facetBuilder.renderSelections(method, activeFacet));
                    } else {
                        var container = $("<div />"),
                            selectedFacetAndAnySubFacets = facetElement.find("a[rel=" + method.facetValue + "], input[rel=" + method.facetValue + "]").parent().removeAttr("style").siblings(".subFacets").addBack(),
                            alreadyHasProductCount = $(selectedFacetAndAnySubFacets).text().indexOf("(") > -1;
                        if (!alreadyHasProductCount) {
                            selectedFacetAndAnySubFacets.find(".facetLink[rel=" + method.facetValue + "]").siblings("i").append("(" + method.itemCount + ")");
                        }
                        selectedFacetAndAnySubFacets.each(function (i, val) {
                            var markup = '<li class="active"><label for="' + method.facetValue + '"><span class="checkbox-facet">' + $(val).html() + "</span></label></li>";
                            container.append(markup);
                        });
                        markupArray.push(container.html());
                    }
                } else {
                    if (facet.seoFacet) {
                        markupArray.push($.facetBuilder.renderLinkItem(method.seoURL, "", method.displayValue, method.facetValue, method.itemCount, activeFacet));
                    } else {
                        markupArray.push($.facetBuilder.renderSelections(method, activeFacet));
                    }
                }
            }
            facetElement.html(markupArray.join(""));
        },
        facetActiveSelections: function (facets) {
            var selections = facets.find(".active .facetLink"),
                len = selections.length,
                arr = [];
            for (i = 0; i < len; i++) {
                arr.push(selections.eq(i).attr("rel"));
            }
            return arr;
        },
        fireQuery: function (facetId, triggeredByHash) {
            if (facetData.processing) {
                clearTimeout($.facetBuilder.options.timer);
            } else {
                facetData.processing = true;
            }
            var hashChangeEvent = false;
            if (triggeredByHash != "undefined" && triggeredByHash) {
                hashChangeEvent = true;
            }
            $.facetBuilder.options.timer = setTimeout(function () {
                $.facetBuilder.postQueryDelay(hashChangeEvent, facetId);
            }, $.facetBuilder.options.ajaxDelay);
            if (!hashChangeEvent && $.facetBuilder.options.lastClicked) {
                $("#facets").bind("mouseover", function (e) {
                    var overEl = e.originalEvent.explicitOriginalTarget;
                    if (!$(overEl).closest($.facetBuilder.options.lastClicked).length) {
                        clearTimeout($.facetBuilder.options.timer);
                        $.facetBuilder.options.timer = setTimeout(function () {
                            $.facetBuilder.postQueryDelay(hashChangeEvent, facetId);
                        }, $.facetBuilder.options.ajaxDelayIntent);
                    }
                });
            }
        },
        postQueryDelay: function (hashChangeEvent, facetId) {
            var query, url = $.facetBuilder.options.json;
            clearTimeout($.facetBuilder.options.timer);
            $("#facets").unbind("mouseover");
            if (pageData.siteName === "/m123") {
                var facetEl = $("#facet_" + facetId);
                facetEl.closest(".facetBody").removeClass("open");
            }
            hashChangeEvent ? (query = $.facetBuilder.stripHash(window.location.hash)) : (query = $.facetBuilder.serializeActive());
            if (hashChangeEvent && !query) {
                query = $.facetBuilder.options.initialHash;
            }
            if ($.facetBuilder.options.allBrands) {
                query = query.replace(/^(fT=)(.*)(2010:[^&:]*)(&?)|(:?)(.*)/gi, "$1$2$4$6");
            }
            if (($.facetBuilder.options.allBrands || window.location.hash.indexOf("allBrands=true") > 0) && query.indexOf("allBrands=true") < 0) {
                query = query + "&allBrands=true";
            }
            var country = pageData.profileCountryCode;
            var currency = pageData.profileCurrencyCode;
            query = query.replace("&profileCountryCode=" + country, "").replace("&profileCurrencyCode=" + currency, "") + "&profileCountryCode=" + country + "&profileCurrencyCode=" + currency;
            document.cookie = "preQuery=" + escape(query);
            if ($.facetBuilder.restoreFromCache(query, facetId)) {
                hashChangeEvent ? $.facetBuilder.setHash(query) : $.facetBuilder.setHash(query, true);
            } else {
                if (query) {
                    $.facetBuilder.facetAjax(url, query, facetId);
                }
            }
            var containerSelector = pageData.siteName !== "/m123" ? ".listing-container" : "#searchContent";
            $.facetBuilder.scrollToTop(containerSelector, 130, 600);
            $.facetBuilder.injectPromoAds();
        },
        customPriceRange: function (priceRange) {
            var currencySymbol = pageData.currencySymbol;
            var range = priceRange.join("-"),
                prettyRange = currencySymbol + priceRange[0] + " - " + currencySymbol + priceRange[1],
                selection = '<li class="active customPrice"><a rel="' + range + '">' + prettyRange + "</a></li>",
                priceFacet = $("#facet_" + facetData.priceFacetId),
                customPrice = priceFacet.find(".customPrice");
            if (customPrice.length) {
                customPrice.remove();
                priceFacet.append(selection);
            } else {
                priceFacet.find("li").addClass("hidden").removeClass("active");
                priceFacet.append(selection);
            }
            $.facetBuilder.fireQuery(facetData.priceFacetId);
        },
        removeCustomPriceRange: function (targetEl) {
            if (targetEl.hasClass("customPrice")) {
                var parent = targetEl.closest("ul");
                parent.find(".hidden").removeClass("hidden");
                targetEl.remove();
            }
        },
        validRange: function (range, els) {
            var improperRange = parseInt(range[0]) > parseInt(range[1]);
            var currencySymbol = pageData.currencySymbol;
            for (i = 0; i < range.length; i++) {
                var val = range[i],
                    valType = typeof val;
                if (improperRange) {
                    els.eq(0).val(range[1]);
                    els.eq(1).val(range[0]);
                    return new Array(range[1], range[0]);
                } else {
                    if (!val) {
                        return false;
                    } else {
                        if (valType == "string" && val.indexOf(currencySymbol) >= 0) {
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        updateSelection: function (targetEl) {
            var active = targetEl.hasClass("active"),
                radio = targetEl.closest("ul").hasClass("radio"),
                activeEls = targetEl.closest("ul").find(".active"),
                subFacets = targetEl.next(".subFacets");
            if (!radio) {
                active ? (newClass = "inactive") : (newClass = "active");
                targetEl.removeClass("active").removeClass("inactive").addClass(newClass);
            } else {
                if (active) {
                    targetEl.removeClass("active");
                } else {
                    activeEls.removeClass("active");
                    targetEl.addClass("active");
                }
            }
            if (subFacets.length && active) {
                subFacets.find("li.active").each(function () {
                    $(this).removeClass("active").addClass("inactive");
                });
            } else {
                if (targetEl.closest(".displayStoreList").length) {
                    $("#facetCont_" + $.facetBuilder.options.findInStoreFacetId).find("li.active").each(function () {
                        $(this).removeClass("active");
                    });
                }
            }
        },
        changeTabs: function () {
            var searchTab = $("#search_tab_all");
            if (!searchTab.hasClass("selected")) {
                searchTab.click();
            }
        },
        serializeActive: function (facetId, facetIdsToExclude) {
            var query = [],
                display = $.facetBuilder.displayParams(),
                store = $.facetBuilder.storeParams(),
                param = $.facetBuilder.options.queryStringVal;
            if (window.location.search) {
                var queryNValues = getQueryStringParam("N", window.location.search);
                var hashNValues = getQueryStringParam("N", param),
                    oldHashNValues = hashNValues;
                queryFacetIds = queryNValues.split("+");
                hashFacetIds = hashNValues.split("+");
                $.each(queryFacetIds, function (i, facetId) {
                    if (facetId != "") {
                        if ($.inArray(facetId, hashFacetIds) > -1) {
                            return true;
                        }
                        if ($.inArray(facetId, facetIdsToExclude) > -1) {
                            return true;
                        }
                        var $facetEl = $("#facets").find('.facetLink[rel="' + facetId + '"]');
                        var isInactive = $facetEl.closest("li").hasClass("inactive") || !$facetEl.parents().length || (pageData.siteName === "/m123" && $facetEl.closest("ul").hasClass("activeFacets"));
                        if (isInactive) {
                            return true;
                        }
                        hashNValues += "+";
                        hashNValues += facetId;
                    }
                });
                if (hashNValues != oldHashNValues) {
                    var hashKey = "N=";
                    param = param.replace(hashKey + oldHashNValues, hashKey + hashNValues);
                }
            }
            if (param.indexOf("N=") < 0) {
                if ($.trim(param) != "") {
                    param = param + "&N=0";
                } else {
                    param = "N=0";
                }
            }
            var facetTrail = $.facetBuilder.facetTrail(facetIdsToExclude);
            param = param.replace("?", "");
            query = param.split("&");
            for (var j = 0; j < query.length; j++) {
                if (query[j].split("=")[0] == "N") {
                    var facetTrailTail = facetTrail ? "+" + facetTrail : "";
                    if (facetIdsToExclude && facetIdsToExclude.length) {
                        var excludedFacetArray = $(query[j].split("=")[1].split("+")).filter(function (el) {
                            return $.inArray(el, facetIdsToExclude) < 0;
                        }).toArray();
                        query[j] = "N=" + excludedFacetArray.join("+") + facetTrailTail;
                    } else {
                        query[j] = "N=" + query[j].split("=")[1] + facetTrailTail;
                    }
                } else {
                    if (query[j].split("=")[0] == "Nao") {
                        query.splice(j, 1);
                        j--;
                    } else {
                        if (query[j].split("=")[0] == "recsPerPage") {
                            query.splice(j, 1);
                            j--;
                        } else {
                            if (query[j].split("=")[0] == "v") {
                                query.splice(j, 1);
                                j--;
                            } else {
                                if (query[j].split("=")[0] == "Ns") {
                                    query.splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }
                }
            }
            query = query.concat(display);
            if (store.length != 0) {
                query = query.concat(store);
            }
            if (facetId) {
                query.push("pfid=" + facetId);
                query.push("Ne=" + facetId);
            }
            return query.join("&");
        },
        pageParams: function () {
            var page = $.facetBuilder.options.browseTemplate,
                pageRules = {
                    search: [
                        ["lP", "s"],
                        ["question", page[1]]
                    ],
                    brand: [
                        ["lP", "b"],
                        ["brandId", page[1]]
                    ],
                    cat: [
                        ["lP", "c"],
                        ["catId", page[1]]
                    ],
                    pc: [
                        ["lP", "pc"],
                        ["catId", page[1]]
                    ],
                    dc: [
                        ["lP", "dc"]
                    ],
                    used: [
                        ["lP", "u"]
                    ],
                    wts: [
                        ["lP", "c"],
                        ["catId", page[1]]
                    ]
                },
                query = $.facetBuilder.initialQuery(["refine", "brand"]),
                params = pageRules[page[0]];
            if (params) {
                for (i = 0; i < params.length; i++) {
                    query.push(params[i].join("="));
                }
            }
            return query;
        },
        initialQuery: function (params) {
            var query = [];
            for (i = 0; i < params.length; i++) {
                var param = getQueryStringParam(params[i], $.facetBuilder.options.queryStringVal);
                if (param) {
                    query.push(params[i] + "=" + param);
                }
            }
            return query;
        },
        modernBrowser: function () {
            var sessionStorage = window.sessionStorage && "onhashchange" in window;
            try {
                window.sessionStorage.test = "123";
                window.sessionStorage.removeItem("test");
            } catch (err) {
                sessionStorage = false;
            }
            $.facetBuilder.options.modernBrowser = sessionStorage;
        },
        facetTrail: function (facetIdsToExclude) {
            var facets = $($.facetBuilder.options.facetContainer),
                len = facets.length,
                facetTrail = [];
            for (x = 0; x < len; x++) {
                var facet = facets.eq(x),
                    facetId = facet.attr("id").replace("facetCont_", "");
                activeEls = facet.find(".active .facetLink").not(function () {
                    return (facetIdsToExclude && facetIdsToExclude.length && $.inArray($(this).attr("rel"), facetIdsToExclude) >= 0);
                });
                activeLen = activeEls.length;
                if (activeEls.length && $.inArray(facetId, facetIdsToExclude) == -1) {
                    facetTrail.push($.facetBuilder.constructTrail(facetId, activeEls, activeLen));
                }
            }
            return facetTrail.join("+");
        },
        constructTrail: function (facetId, activeEls, activeLen) {
            var trail = [];
            for (n = 0; n < activeLen; n++) {
                trail.push(escape(activeEls.eq(n).attr("rel")));
            }
            return trail.join("+");
        },
        displayParams: function () {
            var params = [];
            params[0] = "Nao=" + (($.trim(facetData.pagination.currentPage) == "" ? 1 : facetData.pagination.currentPage) - 1) * facetData.pagination.display;
            params[1] = "recsPerPage=" + facetData.pagination.display;
            if ($.facetBuilder.returnSortBy()) {
                params[3] = "Ns=" + $.facetBuilder.returnSortBy();
            }
            return params;
        },
        storeParams: function () {
            var params = [];
            if ($("#postalCode").length > 0 && $("#distance").length > 0) {
                params[0] = "postalCode=" + $("#postalCode").val();
                params[1] = "radius=" + $("#distance").val();
            }
            return params;
        },
        getDPCookieValue: function (name) {
            var dpCookie = unescape($.cookiesObj().dP);
            var cookieArr = dpCookie.split("&");
            if (cookieArr && cookieArr.length > 0) {
                for (var i = 0; i < cookieArr.length; i++) {
                    var options = cookieArr[i];
                    var optionArr = options.split("=");
                    if (optionArr && optionArr.length == 2 && optionArr[0] == name) {
                        return optionArr[1];
                    }
                }
            }
            return "";
        },
        replaceOrAddInQueryString: function (url, param, value) {
            var re = new RegExp("([?|&])" + param + "=.*?(&|$)", "i");
            if (url.match(re)) {
                return url.replace(re, "$1" + param + "=" + value + "$2");
            } else {
                return url + "&" + param + "=" + value;
            }
        },
        displayCookie: function (sortOrderOverrideValue) {
            var params = $.facetBuilder.displayParams().slice(1).join("&");
            params = params.replace(/(^Ns=r[&]?)|([&]?Ns=r)/, "");
            if (sortOrderOverrideValue) {
                params = $.facetBuilder.replaceOrAddInQueryString(params, "Ns", sortOrderOverrideValue);
            }
            document.cookie = "dP=" + escape(params) + ";path=/";
        },
        updateTotalCounts: function (results, totalResults) {
            var matches = "Results " + results + ' of <var class="searchTotalResults">' + totalResults + "</var>";
            if (pageData.siteName === "/m123" || pageData.siteName === "/wwbw") {
                matches += " matches";
                $("#compareForm .searchResultsUpdateContainer").html(matches);
                if (pageData.siteName === "/wwbw") {
                    $("#search_tab_all strong").text(" " + totalResults);
                } else {
                    $("#search_tab_all strong").text(" (" + totalResults + ")");
                }
            } else {
                $(".fluid-enabled-result-count").html("(" + totalResults + " matches found)");
                $(".-matches").find(".searchTotalResults").html(totalResults);
                $("#resultsRange").html(matches);
            }
        },
        buildPagers: function (data) {
            var pages = data.pagination[0].pages,
                len = pages.length,
                currentPage = data.pagination[0].currentPage,
                pagerStartText = pageData.siteName == "/gc" || pageData.siteName == "/mf" ? "" : "Page: ",
                separators = ["...", "of"],
                pager = [];
            $.facetBuilder.updateTotalCounts(data.pagination[0].results, data.pagination[0].totalResults);
            if (pageData.siteName === "/gc") {
                pager.push('<span class="results-options--option-label">Page: </span>');
            } else {
                if (pageData.siteName === "/mf") {
                    pager.push('<div class="results-options--option-label">Page: </div>');
                }
            }
            for (i = 0; i < len; i++) {
                var linkState = $.facetBuilder.disableLink(pages[i], currentPage),
                    pageLinkText = pages[i].page,
                    pageLinkHtml;
                if (pages[i].page.indexOf("Next") != -1) {
                    var pageLinkTextLabel = "Next Page";
                } else {
                    if (pages[i].page.indexOf("Prev") != -1) {
                        var pageLinkTextLabel = "Previous Page";
                    } else {
                        var pageLinkTextLabel = "Page " + pageLinkText;
                    }
                }
                $.inArray(pages[i].page, separators) < 0 ? (pageName = " page" + $.trim(pages[i].page.replace("&gt;", "").replace("&lt;", ""))) : (pageName = "");
                if (pageData.siteName == "/gc" || pageData.siteName == "/mf") {
                    if (pageLinkText == "of") {
                        pageLinkHtml = "&hellip;";
                    } else {
                        pageName = pageName.replace("pagePrev", "-prev").replace("pageNext", "-next");
                        pageLinkHtml = '<a aria-label="' + pageLinkTextLabel + '" href="" class="page-link' + pageName + linkState + '">' + pageLinkText.replace("&gt;", "").replace("&lt;", "") + "</a>";
                    }
                } else {
                    pageLinkHtml = '<a aria-label="' + pageLinkTextLabel + '" href="" class="pageLink' + pageName + linkState + '">' + pageLinkText + "</a>";
                }
                pager.push(pageLinkHtml);
            }
            if (pageData.siteName == "/gc" && pager.length < 2) {
                $("#compareForm .searchPagination").html("");
            } else {
                $("#compareForm .searchPagination").html(pagerStartText + pager.join(" "));
            }
            $.facetBuilder.sortBy(data.sortBy);
            $.facetBuilder.setDisplay(data.pagination[0].display);
        },
        disableLink: function (page, currentPage) {
            var linkState = "";
            !page.active ? (linkState = " disabled") : null;
            currentPage != page.page ? (linkState = linkState) : (linkState = " pageSelected");
            return linkState;
        },
        sortBy: function (sortBy) {
            var len = sortBy.length,
                select = $("#compareForm .sortBy select"),
                selected = select.find("option:selected"),
                refresh;
            if (select.find("option").size() !== len) {
                select.empty();
                refresh = true;
            }
            for (var i = 0; i < len; i++) {
                if (refresh) {
                    select.append('<option value="' + sortBy[i].value + '">' + sortBy[i].name + "</option>");
                }
                if (sortBy[i].selected) {
                    var value = sortBy[i].value,
                        option = select.find('option[value="' + value + '"]');
                    selected.prop("selected", false);
                    option.prop("selected", true);
                }
            }
        },
        setDisplay: function (displayCt) {
            var display = $("#compareForm .displayNumber");
            if (pageData.siteName == "/mf") {
                var selected = display.find("option:selected"),
                    option = display.find('option[value="' + displayCt + '"]');
                selected.prop("selected", false);
                option.prop("selected", true);
            } else {
                if (pageData.siteName == "/gc") {
                    switch (displayCt) {
                        case "30":
                            var ct = "default";
                            break;
                        case "60":
                            var ct = "more";
                            break;
                        case "90":
                            var ct = "most";
                            break;
                        default:
                            var ct = "default";
                            break;
                    }
                    display.find("li button").removeClass("-selected");
                    display.find("." + ct + " button").addClass("-selected");
                } else {
                    switch (displayCt) {
                        case "20":
                            var ct = "default";
                            break;
                        case "40":
                            var ct = "more";
                            break;
                        case "60":
                            var ct = "most";
                            break;
                        default:
                            var ct = "default";
                            break;
                    }
                    display.find("li a").removeClass("selected");
                    display.find("." + ct + " a").addClass("selected");
                }
            }
        },
        renderProducts: function (products) {
            var prodCt = products.length,
                productGrid = [],
                labelAliases = {
                    used: $.trim($("#usedLableAliasVar").text()),
                    list: $.trim($("#listPriceLabel").text())
                };
            for (n = 0; n < prodCt; n++) {
                $.facetBuilder.isDivisible(n + 1, 4) ? (lastChild = ' class="lastChild"') : (lastChild = "");
                productGrid.push(productTemplate(products[n], lastChild, n, prodCt, labelAliases));
            }
            $("#resultsContent").replaceWith('<div id="resultsContent"><div class="productGrid product-grid"><ol>' + productGrid.join("") + "</ol></div></div>");
            $("img.lazy").lazyload({
                effect: "fadeIn",
                skip_invisible: false,
                threshold: 200
            });
        },
        isDivisible: function (n, x) {
            return n % x == 0;
        },
        compareTemplate: function (product) {
            var compareClass = $.facetBuilder.compareClass(product.compared, facetData.pagination.totalCompared),
                compareNowClass = $.facetBuilder.compareNowClass(product.compared, facetData.pagination.totalCompared),
                checkedState = $.facetBuilder.checkedState(product.compared),
                labelClass = $.facetBuilder.labelState(product.compared),
                compareText = $.facetBuilder.compareText(product.compared);
            var comparePath = "/browse/productComparison.jsp";
            if (pageData.siteName === "/mf" || pageData.siteName === "/wwbw" || pageData.siteName === "/gc") {
                comparePath = "/product-comparison";
            }
            return ("<span" + labelClass + '><label for="' + product.productID + '"><input id="' + product.productID + '" data-prodid="' + product.productID + '" type="checkbox" name="compareCheckbox" class="' + product.productID + '"' + checkedState + '><i><span class="' + compareClass + ' label">Compare</span></i><span class="' + compareNowClass + ' compareNowLink"><a href="' + pageData.contextPath + comparePath + '">' + compareText + "</a></span></label></span>");
        },
        compareText: function (checked) {
            return checked && MFI.CompareItemsContainer && MFI.CompareItemsContainer.getProductsToCompare().length == MFI.CompareItemsContainer.getMaxProductsToCompare() ? "Compare now, at limit" : "Compare Now";
        },
        labelState: function (checked) {
            checked ? (labelClass = ' class="productCompare selected"') : (labelClass = ' class="productCompare"');
            return labelClass;
        },
        compareClass: function (checked, count) {
            if (count > 1 && checked) {
                return "conceal";
            } else {
                return "";
            }
        },
        compareNowClass: function (checked, count) {
            if (count > 1 && checked) {
                return "";
            } else {
                return "conceal";
            }
        },
        checkedState: function (checked) {
            if (checked) {
                return ' checked="checked"';
            } else {
                return "";
            }
        },
        stickerTemplate: function (product) {
            product.sticker ? (tag = '<strong class="' + product.stickerClass + '"><span>' + product.sticker + "</span></strong>") : (tag = "");
            return tag;
        },
        updateBrands: function (facet) {
            var brandData = $.facetBuilder.options.brandData,
                brandSearch = $(brandData.searchBox),
                returnBrandFacet = function (element) {
                    return element.facetName && element.facetName === "Brands";
                },
                facetWithBrands = facet ? $.grep(facet.facets, returnBrandFacet) : [],
                seeAllBrandsLink = $(".linkToBrand");
            if (typeof (facetData.pagination || {}).currentPage === "undefined" || (facetData.pagination || {}).currentPage === "1") {
                seeAllBrandsLink.show();
            } else {
                seeAllBrandsLink.hide();
            }
            if (!brandSearch.length) {
                return false;
            }
            brandData.listItems = $("#facet_" + facetData.brandFacetId + " li");
            if (brandSearch.val() != "Search Brands" && pageData.siteName == "/m123") {
                brandSearch.val("Search Brands");
                brandData.listItems.removeClass("hidden");
            }
            if (typeof facet != "undefined" && facetWithBrands.length) {
                brandData.brandList = facetWithBrands[0].methods;
                brandData.len = brandData.brandList.length;
                brandData.nonAjax = false;
            } else {
                if (facetData.facets) {
                    if ($.facetBuilder.options.lastFacetApplied != facetData.brandFacetId) {
                        var brandFacets = $.grep(facetData.facets, returnBrandFacet);
                        brandData.brandList = brandFacets.length ? brandFacets[0].methods : {};
                        brandData.len = brandData.brandList.length;
                        brandData.nonAjax = false;
                    }
                } else {
                    if ($.facetBuilder.options.browseTemplate[0] != "brand") {
                        brandData.brandList = $("#brandData").text().split(",");
                        brandData.len = brandData.brandList.length;
                        brandData.nonAjax = true;
                    }
                }
            }
            $("#facets .brand .inactive").length ? brandSearch.show() : brandSearch.hide();
            $.facetBuilder.options.brandData = brandData;
        },
        handleKeys: function () {
            $.facetBuilder.updateBrands();
            var brandData = $.facetBuilder.options.brandData;
            $(document).on("keyup", $.facetBuilder.options.brandData.searchBox, function () {
                var $brandFacetContainer = $(brandData.facetContainer);
                if ($brandFacetContainer.length && !$brandFacetContainer.find("ul.facets").hasClass("loaded") && $(brandData.loadAllContainer).length) {
                    $.facetBuilder.seeAllBrandRefinements($(brandData.loadAllBrandsLink), true);
                } else {
                    $.facetBuilder.filterBrands();
                }
            });
        },
        filterBrands: function () {
            var brandData = $.facetBuilder.options.brandData,
                filter = $(brandData.searchBox).val().toLowerCase(),
                filterLen = filter.length,
                $brandFacetList = $(brandData.facetContainer).find("ul.facets"),
                brandsNotLoaded = $(brandData.loadAllBrandsLink).length && !$(brandData.loadAllBrandsLink).hasClass("clicked");
            for (i = 0; i < brandData.len; i++) {
                if (brandData.nonAjax) {
                    var position = brandData.brandList[i].toLowerCase().indexOf(filter);
                } else {
                    var position = brandData.brandList[i].displayValue.toLowerCase().indexOf(filter);
                }
                var $thisEl = brandData.listItems.eq(i);
                if (position < 0 && filterLen > 0) {
                    $thisEl.addClass("hidden");
                } else {
                    if (filterLen <= 0 && brandsNotLoaded) {
                        if (i > 9) {
                            $thisEl.addClass("hidden");
                        } else {
                            $thisEl.removeClass("hidden");
                        }
                    } else {
                        $thisEl.removeClass("hidden");
                    }
                }
            }
            if (brandsNotLoaded) {
                $brandFacetList.removeClass("overflow-facet").addClass("initial-load");
                if (filterLen <= 0) {
                    $(brandData.loadAllContainer).fadeIn("fast");
                } else {
                    $(brandData.loadAllContainer).hide();
                }
            } else {
                if ($brandFacetList.find("li:visible").length < 10) {
                    $brandFacetList.removeClass("overflow-facet").addClass("initial-load");
                } else {
                    $brandFacetList.addClass("overflow-facet").removeClass("initial-load");
                }
            }
            $.facetBuilder.noResults(brandData.len);
        },
        seeAllBrandRefinements: function ($seeAllLink, filterBrandsOnLoad) {
            var brandData = $.facetBuilder.options.brandData,
                $brandFacetContainer = $(brandData.facetContainer),
                $selectedBrandItem = $brandFacetContainer.find("li.active"),
                selectedBrandId = $selectedBrandItem.length ? $selectedBrandItem.find(".facetLink").attr("rel") : "",
                $brandLoadingBlocker = $brandFacetContainer.find(".facet-loading-blocker"),
                $facetsList = $brandFacetContainer.find("ul.facets"),
                brandsQuery = $.facetBuilder.getBrandsQuery(selectedBrandId) + "&showMoreBrand=true";
            $brandLoadingBlocker.show();
            $facetsList.addClass("loading");
            if (brandsQuery == "") {
                clog("Missing required nav state");
                $(brandData.loadAllBrandsLink).hide();
                $facetsList.removeClass("initial-load").removeClass("loaded");
                return;
            }
            $.ajax({
                type: "GET",
                dataType: "json",
                data: brandsQuery,
                cache: false,
                url: $.facetBuilder.options.showAllBrandsJSON,
                success: function (data) {
                    var $clickedContainer = $seeAllLink.parent().hasClass("openFacets") ? $seeAllLink.parent() : $(brandData.loadAllContainer);
                    try {
                        var parsedRefinements = data.facets[0].methods,
                            refinementsHtml = "",
                            brandVarDataString = "";
                        for (var i = 0; i < parsedRefinements.length; i++) {
                            var refinement = parsedRefinements[i],
                                activeClass = selectedBrandId == refinement.facetValue ? "active" : "inactive";
                            refinementsHtml += '<li class="' + activeClass + '"><a class="facetLink" rel="' + refinement.facetValue + '" href="' + refinement.seoURL + '">' + refinement.displayValue + "&nbsp;(" + refinement.itemCount + ")</a></li>";
                            if (i > 0) {
                                brandVarDataString += ",";
                            }
                            brandVarDataString += refinement.displayValue;
                        }
                        var overflowClass = parsedRefinements.length > 10 ? "overflow-facet" : "";
                        $("#brandData").text(brandVarDataString);
                        $clickedContainer.fadeOut("fast", function () {
                            $facetsList.html(refinementsHtml).removeClass("initial-load").addClass(overflowClass).addClass("loaded");
                            setTimeout(function () {
                                $.facetBuilder.updateBrands(data);
                                if (filterBrandsOnLoad) {
                                    $.facetBuilder.filterBrands();
                                }
                            }, 10);
                        });
                    } catch (e) {
                        clog("Error parsing brands JSON: " + e.message);
                        $clickedContainer.hide();
                    } finally {
                        $brandLoadingBlocker.hide();
                        $facetsList.removeClass("loading");
                    }
                },
                error: function (xhr, textStatus, errorThrown, facetData) {
                    clog("Error: " + xhr + " " + textStatus + " " + errorThrown);
                    $brandLoadingBlocker.hide();
                    $facetsList.removeClass("loading");
                }
            });
        },
        getBrandsQuery: function (selectedBrandId) {
            var $queryStringVar = $("#queryString"),
                urlHash = window.location.hash,
                urlQuery = window.location.search,
                brandsQuery = "",
                pageNameParam = "",
                searchTermParam = "",
                initialNParam = "",
                hashNValues = "",
                queryNValues = "";
            allNValues = "";
            if (!$queryStringVar.length) {
                clog("#queryString var not found so missing required pageName param.");
                return "";
            }
            brandsQuery = $queryStringVar.text();
            pageNameParam = getQueryStringParam("pageName", brandsQuery);
            searchTermParam = getQueryStringParam("Ntt", brandsQuery);
            initialNParam = getQueryStringParam("N", brandsQuery);
            if (urlHash) {
                hashNValues = getQueryStringParam("N", urlHash);
                if (searchTermParam == "") {
                    searchTermParam = getQueryStringParam("Ntt", urlHash);
                }
            }
            if (urlQuery) {
                queryNValues = getQueryStringParam("N", urlQuery);
                if (searchTermParam == "") {
                    searchTermParam = getQueryStringParam("Ntt", urlQuery);
                }
            }
            allNValues = initialNParam + (hashNValues != "" ? "+" + hashNValues : "") + (queryNValues != "" ? "+" + queryNValues : "");
            brandsQuery = "pageName=" + pageNameParam + (searchTermParam != "" ? "&Ntt=" + searchTermParam : "") + (allNValues != "" ? "&N=" + allNValues : "");
            return brandsQuery.replace("?", "").replace(selectedBrandId, "").replace("=+", "=").replace("+&", "&").replace("++", "+");
        },
        noResults: function (len) {
            var list = $("#facet_" + facetData.brandFacetId),
                hiddenLen = list.find(".hidden").length,
                noResults = '<li class="messaging">No matching brands.</li>';
            list.find(".messaging").remove();
            if (len == hiddenLen) {
                list.append(noResults);
            }
        },
        renderClearLink: function (state, facet) {
            var vClass = state ? "" : "notVisible",
                hrefAttr = facet.clearURL ? 'href="' + facet.clearURL + '"' : "";
            return ('<a class="clearFacets ' + vClass + '"' + hrefAttr + '>Clear <span class="screen-reader-only">Facets</span></a>');
        },
        checkClearLinks: function () {
            var clearAllLink = $("#clearAllFacets"),
                lastFacet = $("#facetCont_" + $.facetBuilder.options.lastFacetApplied),
                clearLink = $.facetBuilder.renderClearLink(lastFacet.find(".active").length, {});
            lastFacet.closest(".facetBody").find(".clearFacets").replaceWith(clearLink);
            var hasActiveFacets = $.facetBuilder.options.root.find(".facets .active").length;
            var vClass = hasActiveFacets ? "" : "notVisible";
            clearAllLink.attr("class", vClass);
        },
        initClearLinks: function () {
            $($.facetBuilder.options.activeFacets).each(function () {
                $(this).closest(".facetBody").find(".clearFacets").removeClass("notVisible");
            });
        },
        setPageAndFireQueryForFacet: function (page, facetId) {
            facetData.pagination.currentPage = page;
            $.facetBuilder.fireQuery(facetId);
        },
        setNewSortBy: function (value) {
            facetData.sortBy = [];
            facetData.sortBy[0] = {};
            facetData.sortBy[0].value = value;
            facetData.sortBy[0].selected = true;
            facetData.pagination.currentPage = 1;
            $.facetBuilder.displayCookie(value);
            $.facetBuilder.fireQuery();
        },
        setNewDisplayCt: function (ct) {
            facetData.pagination.display = ct;
            facetData.pagination.currentPage = 1;
            $.facetBuilder.displayCookie();
            $.facetBuilder.fireQuery();
        },
        setNewPage: function (page) {
            facetData.pagination.currentPage = page;
            $.facetBuilder.fireQuery();
        },
        newPaginationObj: function () {
            if (!facetData.pagination) {
                facetData.pagination = [];
                if ($("#compareForm .displayNumber").eq(0).find(".-selected").text()) {
                    facetData.pagination.display = $("#compareForm .displayNumber").eq(0).find(".-selected").text();
                } else {
                    if ($("#compareForm select.displayNumber").length) {
                        facetData.pagination.display = $("#compareForm select.displayNumber").eq(0).val();
                    } else {
                        if ($("ul.displayNumber a.selected").length) {
                            facetData.pagination.display = $("ul.displayNumber a.selected").html();
                        } else {
                            facetData.pagination.display = pageData.siteName === "/gc" || pageData.siteName === "/mf" ? 30 : 20;
                        }
                    }
                }
                facetData.pagination.currentPage = $("#compareForm .searchPagination").eq(0).find(".pageSelected").text();
            }
            if (!facetData.sortBy) {
                facetData.sortBy = [];
                facetData.sortBy[0] = {};
                facetData.sortBy[0].value = $.facetBuilder.originalSortValue();
                facetData.sortBy[0].selected = true;
            }
        },
        returnSortBy: function () {
            var param = $.facetBuilder.getCookieSortValue(),
                optionExists = $('select[name="Ns"] option[value="' + param + '"]').length;
            if (param && optionExists) {
                return param;
            } else {
                return "";
            }
        },
        initHashWatcher: function () {
            var hasInvalidFacetHash = window.location.hash.indexOf("=") < 0,
                hashChangeEvent = function () {
                    var hasInvalidFacetHash = window.location.hash.indexOf("=") < 0,
                        currentUrl = window.location.href;
                    if ((!window.location.hash || hasInvalidFacetHash) && currentUrl.indexOf("#") != currentUrl.length - 1) {
                        location.reload();
                    }
                    if (!facetData.processing && !$.facetBuilder.options.triggeredByHash && !hasInvalidFacetHash) {
                        var tabInHash = getQueryStringParam("tab", $.facetBuilder.stripHash(window.location.hash)),
                            tab;
                        tabInHash ? (tab = $("#" + tabInHash)) : (tab = $("#search_tab_all"));
                        if (!tab.hasClass("selected")) {
                            tab.click();
                        }
                        if (!tabInHash) {
                            $.facetBuilder.fireQuery(0, true);
                        }
                    }
                    $.facetBuilder.options.triggeredByHash = false;
                };
            $(window).bind("hashchange", hashChangeEvent);
            if (!window.location.hash || hasInvalidFacetHash) {
                $.facetBuilder.options.initialHash = $.facetBuilder.serializeActive();
            } else {
                $(window).trigger("hashchange");
            }
        },
        setHash: function (newHash, force) {
            var currHash = $.facetBuilder.stripHash(window.location.hash);
            if (!typeof force === "boolean") {
                force = false;
            }
            if (newHash !== $.facetBuilder.options.initialHash || force) {
                if ($.facetBuilder.options.modernBrowser && newHash !== currHash) {
                    $.facetBuilder.options.triggeredByHash = true;
                    window.location.hash = newHash;
                } else {
                    if (!$.facetBuilder.options.modernBrowser) {
                        UrlHashWatcher.setNewPageHash(newHash);
                    }
                }
                if (pageData.siteName == "/gc") {
                    $.facetBuilder.options.backLinks.storeCurrLocation({
                        hashLocation: newHash
                    });
                }
                $.facetBuilder.updateAdvancedSearch();
            }
        },
        stripHash: function (hash) {
            if (hash.indexOf("#") == 0) {
                hash = hash.split("#")[1];
            }
            return hash;
        },
        restoreFromCache: function (query, facetId) {
            if ($.facetBuilder.options.modernBrowser && sessionStorage[query] != null && !$.facetBuilder.options.sessionCacheDisabled) {
                try {
                    var json = JSON.parse(sessionStorage[query]);
                    $.facetBuilder.buildFacets(json, query, facetId);
                    return true;
                } catch (e) {
                    clog("Unable to retrieve and restore query: " + e.message);
                    return false;
                }
            } else {
                return false;
            }
        },
        truncate: function (str, len) {
            if (str.length > len) {
                str = str.substr(0, len) + "...";
            }
            return str;
        },
        getCookieSortValue: function () {
            var cookies = unescape($.cookiesObj().dP),
                param = "";
            cookies && cookies.indexOf("Ns=") >= 0 && (param = $.facetBuilder.getDPCookieValue("Ns"));
            return param;
        },
        originalSortValue: function () {
            var param = $.facetBuilder.getCookieSortValue(),
                optionExists = $('select[name="Ns"] option[value="' + param + '"]').length;
            if (!param || !optionExists) {
                param = $("#compareForm .sortBy select").eq(0).val();
            }
            $('select[name="Ns"]').val(param);
            return param;
        },
        injectPromoAds: function () {
            if ($.trim(facetData.pagination.currentPage) == 1) {
                var plppromoAds = $("#plp-promoAds li");
                $(plppromoAds).each(function () {
                    var $this = $(this),
                        adsPosition = 6,
                        clonedAd = $this.clone(),
                        lastPosition = $("#resultsContent .product-grid li.product-container").length;
                    if ($this.attr("promo-ads-position") > 0) {
                        adsPosition = $this.attr("promo-ads-position");
                    }
                    if (adsPosition == lastPosition) {
                        $("#resultsContent .product-grid li.product-container:nth-child(" + lastPosition + ")").after(clonedAd);
                    } else {
                        $("#resultsContent .product-grid li.product-container:nth-child(" + adsPosition + ")").before(clonedAd);
                    }
                });
            }
        },
        updateRecCountOnH1: function () {
            if ($("body.fluid-width-enabled").length && $("var.searchTotalResults").length && $(".fluid-enabled-result-count").length && $("h1").length) {
                $(".fluid-enabled-result-count").text("(" + $("var.searchTotalResults").first().text() + " matches found)");
                $(".fluid-enabled-result-count").show();
            }
        },
        scrollToTop: function (el, pixelOffset, time) {
            try {
                var offset = $(el).offset().top - pixelOffset;
                $("html").animate({
                    scrollTop: offset + "px"
                }, time);
            } catch (e) {
                clog("Unable to set offset");
            }
        }
    });
    $("#facets").on("click", ".facetBody button", function () {
        var facetBody = $(this).closest(".facetBody"),
            facetContainer = facetBody.find(".facetContainer");
        if (!facetBody.hasClass("closeFacet")) {
            facetBody.addClass("closeFacet");
            facetContainer.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            $(this).attr("aria-expanded", "false");
        } else {
            facetBody.removeClass("closeFacet");
            facetContainer.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            });
            $(this).attr("aria-expanded", "true");
        }
    });
})(jQuery);
$("#facets").facetBuilder();
var FindInStoreWidget = (function () {
    var e = "1097",
        c = 500,
        a = "";
    var p = function (s) {
        s.preventDefault();
        var r = $(this),
            t = r.parent();
        var q = {
            success: function (B) {
                var A = B.error,
                    z = "",
                    C = t.find(".postalCode").val(),
                    v = t.find(".distance").val();
                if (A == null || A.length == 0) {
                    var w = $(B.stores),
                        u = [];
                    u = w.map(function () {
                        if (this.disabled === "false") {
                            return this.dimensionID;
                        }
                    });
                    t.find("#storeCount").html(w.length);
                    z = u.get().join("+");
                    $("a#btnShopNow").show();
                } else {
                    $("#storeCount").text("0");
                    t.append('<div class="errorMessage">' + A + "</div>");
                    $("a#btnShopNow").hide();
                }
                $("a#btnShopNow").attr("href", $("#seoUrl").val() + "?radius=" + v + "&postalCode=" + C + "&N=" + z + "#mainPageHeader");
            }
        };
        d(q, t);
    };
    var k = function (s) {
        s.preventDefault();
        var r = $(this),
            t = r.parent();
        if (r.hasClass("changeStore") && r.hasClass("apply")) {
            t.find(".errorMessage").detach();
            if ($("#searchStoreParam #distance").val() > c) {
                t.append('<div class="errorMessage">Please enter a distance up to ' + c + " miles.</div>");
                return;
            }
        }
        var q = {
            beforeSend: function () {
                $(".displayStoreList + .facetContainer ul").html('<span class="loadingImg"><img src="' + pageData.styleStaticContentUrl + '/img/brand/gc/cmn/loader-sm.gif" alt="Loading..." />Loading...</span>');
            },
            success: function (A) {
                var D = A.error,
                    E = 0,
                    I = true;
                if (D == null || D.length == 0) {
                    var v = "",
                        G = $(A.stores),
                        B = [],
                        u = $(".displayStoreList input#postalCode").val(),
                        C = $(".displayStoreList input#distance").val(),
                        z = B.join("+"),
                        F = $("#searchStoreParam li label").parent(),
                        w = $(".storeResults"),
                        H = $(".displayStoreList + .facetContainer-store");
                    a = u;
                    G.each(function (K, J) {
                        if (J.disabled == "false") {
                            E++;
                        }
                        B.push(J.dimensionID);
                        v += '<li id="store_' + J.id + '" class="' + (J.disabled == "true" ? "inactive" : "active") + '"><label for="' + J.dimensionID + '"><span class="checkbox-facet ' + (J.disabled == "true" ? "disabled" : "") + '"><input id="' + J.dimensionID + '" type="checkbox" class="facetLink ' + (J.disabled == "true" ? "disabled" : "") + '" rel="' + J.dimensionID + '"/><i>' + J.name + " (" + J.distance + " " + J.distanceUnit + ')</i></span></label><var class="storeData hidden">{ "id":"' + J.id + '", address":"' + J.address + '", "name":"' + J.name + '", "state":"' + J.state + '", "city":"' + J.city + '", "distance":"' + J.distance + '", "distanceUnit":"' + J.distanceUnit + '", "zipCode":"' + J.zipCode + '", "phone":"' + J.phone + '", "mapURL":"' + J.mapURL + '", "isAvailableNow":"' + J.isAvailableNow + '"}</var></li>';
                    });
                    if (E === 0) {
                        I = false;
                        $(".displayStoreList + .facetContainer ul").html("<li class='no-stores-msg'>No stores found with matching products.</li>");
                    } else {
                        $(".displayStoreList + .facetContainer ul").html(v);
                    }
                    $(".shopByStore #storeCount").html(G.length);
                    $("a#btnShopNow").attr("href", $("#seoUrl").val() + "?radius=" + C + "&postalCode=" + u + "&N=" + z + "#mainPageHeader");
                    t.parent().find("#storeDimensionIds").remove().end().append("<var id='storeDimensionIds' class='hidden'>" + z + "</var>");
                    F.removeClass("active");
                    w.prop("checked", true);
                    w.closest("#searchStoreParam").find("li.inactive").removeClass("inactive").addClass("active");
                    if (!H.is(":visible")) {
                        H.slideDown();
                    }
                    $("#facet_" + e + " li .facetLink:not(.disabled)").each(function () {
                        $(this).closest("li").removeClass("inactive").addClass("active");
                    });
                    if (I != false) {
                        $.facetBuilder.setPageAndFireQueryForFacet(1, e);
                    }
                } else {
                    $(".displayStoreList + .facetContainer ul .loadingImg").remove();
                    t.append("<div class='errorMessage'>" + D + "</div>");
                    $("a#btnShopNow").hide();
                }
            }
        };
        d(q, t);
    };
    var f = function (s, t) {
        var r, q;
        if (s) {
            s.preventDefault();
            q = $(s.target);
            r = $(this).closest(".displayStoreList");
        } else {
            r = t;
        }
        r.find(".errorMessage").remove();
        h(r, q);
    };
    var m = function (t, q) {
        t.find(".errorMessage").remove();
        var v = $.trim(t.find(".distance").val()),
            s = $.trim(t.find(".postalCode").val()),
            r = false,
            u = "";
        if (v == "") {
            u = "Please enter a distance.";
            r = true;
        } else {
            if (v > c) {
                u = "Please enter a distance up to " + c + " miles.";
                r = true;
            } else {
                if (s === "" || s.length === 0 || $.trim(s.toLowerCase()) === "zip") {
                    u = "Please enter your ZIP code.";
                    r = true;
                } else {
                    if (!(Math.floor(s) == s && $.isNumeric(s))) {
                        u = "The ZIP code you entered is invalid. Please try again.";
                        r = true;
                    }
                }
            }
        }
        if (r) {
            if (typeof q == "function") {
                q();
            }
            t.append("<div class='errorMessage'>" + u + "</div>");
            $("a#btnShopNow").hide();
            t.parent().find(".facetContainer ul.facets li").slideUp("fast", function () {
                $(this).remove();
            });
            return true;
        }
        return false;
    };
    var o = function (u) {
        var s = $(".displayStoreList #searchStoreParam > li"),
            v = s.closest(".displayStoreList"),
            t = $(".displayStoreList + .facetContainer"),
            r = $(".displayStoreList + .facetContainer li");
        if (!s.hasClass("active")) {
            s.addClass("active").removeClass("inactive");
            if (v.find(".errorMessage").length || m(v, function () {
                    f(undefined, v);
                })) {
                return;
            }
            var q = v.find(".postalCode").val();
            if (r.length === 0 || q != a) {
                $("#facets .changeStore.apply").trigger("click");
            }
            t.slideDown();
            $("#facet_" + e + " li .facetLink:not(.disabled)").each(function () {
                $(this).closest("li").removeClass("inactive").addClass("active");
            });
        } else {
            s.addClass("inactive").removeClass("active");
            v.find(".errorMessage").remove();
            t.slideUp();
            $("#facet_" + e + " li").removeClass("active").addClass("inactive");
        }
        if (r.length > 0) {
            $.facetBuilder.setPageAndFireQueryForFacet(1, e);
        }
    };
    var g = function (r) {
        var q = !$(this).hasClass("readonly");
        if (q) {
            r.stopPropagation();
        }
    };

    function l() {
        var r = $("#navState").text().split("+"),
            q = $("#storeDimensionIds").text().split("+");
        r = $(r).filter(function (s, t) {
            return $.inArray(t, q) < 0;
        }).toArray();
        return r.length > 0 ? r.join("+") : "0";
    }

    function j() {
        try {
            if (objOmniture && objOmniture.eVar1) {
                if (objOmniture.eVar1.indexOf("&gt;") >= 0) {
                    var q = objOmniture.eVar1.lastIndexOf("&gt;") + 4;
                    return $.trim(objOmniture.eVar1.substring(q));
                } else {
                    return $.trim(objOmniture.eVar1);
                }
            } else {
                return "";
            }
        } catch (r) {
            clog("error getting search terms: " + r);
        }
    }

    function d(q, s) {
        if (m(s)) {
            return;
        }
        var r = {
            data: {
                postalCode: s.find(".postalCode").val(),
                radius: s.find(".distance").val(),
                filterStore: s.find("#filterStore").val(),
                navState: l(),
                terms: j()
            },
            beforeSend: function () {},
            success: function () {}
        };
        q = $.extend(r, q);
        b(s);
        $.ajax({
            data: q.data,
            url: pageData.contextPath + "/ajax/storeLocation/findInStoreList.jsp",
            type: "GET",
            cache: false,
            timeout: 10000,
            error: function (v, t, u) {
                clog("Error: " + v.status + " - " + u);
                alert("There was an error finding stores. Please try again.");
            },
            dataType: "json",
            beforeSend: q.beforeSend,
            success: q.success
        });
    }

    function h(r, q) {
        r.find(".postalCode").removeAttr("readonly").removeClass("readonly");
        r.find(".distance").removeAttr("readonly").removeClass("readonly");
        r.find(".radius").css("display", "none");
        r.find(".changeStore").text("Apply").removeClass("change").addClass("apply");
        if (q != "undefined" && q != undefined && !q.hasClass("postalCode")) {
            r.find("#distance").focus();
        }
    }

    function b(r) {
        var q = r.find(".distance").val();
        r.find(".postalCode").attr("readonly", "readonly").addClass("readonly");
        r.find(".distance").attr("readonly", "readonly").addClass("readonly");
        r.find(".radius").css("display", "inline-block").text(q);
        r.find(".changeStore").text("Change").removeClass("apply").addClass("change");
    }
    return {
        loadStoresForFaceting: k,
        findStores: p,
        changeZipAndMileage: f,
        toggleStores: o,
        preventZipAndMileageClicks: g
    };
})();
$(document).on("click", ".changeStore.change, #searchStoreParam span.radius, #searchStoreParam #postalCode", FindInStoreWidget.changeZipAndMileage);
$(document).on("click", "#facets .changeStore.apply", FindInStoreWidget.loadStoresForFaceting);
$(document).on("click", ".shopInfo .changeStore.apply", FindInStoreWidget.findStores);
$(document).on("click", ".displayStoreList #searchStoreParam .facetLink", FindInStoreWidget.toggleStores);
$(document).on("click focus", "#searchStoreParam .postalCode, #searchStoreParam .distance", FindInStoreWidget.preventZipAndMileageClicks);
var resultsPerPage = $("ul#displayNumber a.selected").html();
if (resultsPerPage == null) {
    resultsPerPage = 20;
}

function searchDataLoad(d) {
    var c = d;
    var b = $("#search_result_trail_string").val();
    var a = $("#current_view").val();
    $("#spf_goToPage").val(c);
    $("#spf_facetTrail").val(b);
    $("#spf_view").val(a);
    $("#spf_pageSize").val($("#pagination-page-size").val());
    return $("#search-pagination-form").serialize();
}

function searchTabsCallbacks(a) {
    $("#selectedFacetTabName").val(a);
    switch (a) {
        case "all":
            $("fieldset.view").css({
                visibility: "visible"
            });
            break;
        case "learningCenter":
            $LAB.setOptions({
                AllowDuplicates: false
            }).script(pageData.staticContentUrl + "/cmn/productionJs/mediaMorePackage.js" + pageData.versionParam).wait(function () {
                learningCenterCallbacks("videos");
            });
            break;
    }
}
$(document).ready(function () {
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false,
        threshold: 200
    });
    $LAB.setOptions({
        AllowDuplicates: false
    }).script(pageData.staticContentUrl + "/cmn/productionJs/cat2_searchResultsPostLoad.js" + pageData.versionParam);
});
microTimer.log("search results 2 end: ");
GCI.digitalData.omnitureData = GCI.digitalData.omnitureData || {};
$("#searchTabs").tabModule({
    selected: ".tabs a",
    reqType: "POST",
    forceAppend: true,
    clickCallback: function (c, a, b) {
        if (c.closest("#mediaTabs").length) {
            return false;
        }
        if (c.attr("id") === "search_tab_media") {
            content_show = a;
        } else {
            content_show = pageData.contextPath + "/ajax/searchResultsContent.jsp";
        }
        return content_show;
    },
    reqDataCallback: function (c) {
        if (c.attr("id") === "search_tab_media") {
            var b = {};
            return b;
        } else {
            b = $("#rootParams").text();
            tabHref = c.attr("href");
            pageUrl = $("#rootURL").text();
            b = b + "&page=" + pageUrl;
            var a = {};
            tabHref.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function (e, d, g, f) {
                a[d] = f;
            });
            if (a.content != null) {
                b = b + "&content=" + a.content;
            }
            return b;
        }
    },
    successCallback: function (a) {
        searchTabsCallbacks(a);
    }
});
if (pageData.siteName === "/m123") {
    $("#sidebar #facets").on("click", "strong", function () {
        var c = $(this),
            k = c.parents(".facetBody"),
            g = k.attr("id").replace("facetBody_", ""),
            e = $("#sidebar #facets .open"),
            a = k.hasClass("open"),
            f = c.find("button"),
            j = k.find(".facetContainer");
        e.removeClass("open");
        f.attr({
            "aria-expanded": "false"
        });
        $(j).attr({
            "aria-hidden": "true",
            "aria-expanded": "false"
        });
        if (!a) {
            k.addClass("open");
            $(j).attr({
                "aria-hidden": "false",
                "aria-expanded": "true"
            });
            f.attr({
                "aria-expanded": "true"
            });
            if (k.find(".active").length) {
                var d = k.find("[rel]").map(function () {
                        return $(this).attr("rel");
                    }),
                    h = $.facetBuilder.serializeActive(g, d),
                    b = k.find(".facetContainer");
                $.facetBuilder.singleFacetQuery(b, h, g);
            }
        }
    });
    $("body").click(function (a) {
        if (!$(a.target).closest("#facets").length) {
            $("#facets > .open").removeClass("open");
        }
    });
    $("#facets").on("click", ".closeButton", function (a) {
        a.preventDefault();
        $(this).parents(".facetBody").removeClass("open");
    });
}
$("#priceRangeFrom, #priceRangeTo").preventKeyCode({
    entryType: "numeric"
});
$(".displayNumber").on("click", "button", function (d) {
    d.preventDefault();
    var a = $(d.target),
        b = a.closest("#displayNumber").find("button.-selected"),
        c = b.text();
    if (!a.hasClass("-selected")) {
        b.removeClass("-selected");
        a.addClass("-selected");
        $.facetBuilder.setNewDisplayCt(a.text());
        conditionalScroll(a);
        GCI.digitalData.analyticsData.displayPerPage = c;
        globalDispatchEvent("plpDisplayNumberUpdated");
    }
});
$(".displayNumber").on("click", "a", function (c) {
    c.preventDefault();
    var a = $(this),
        b = a.text();
    if (!a.hasClass(".selected")) {
        setSelected(a);
    }
    GCI.digitalData.analyticsData.displayPerPage = b;
    globalDispatchEvent("plpDisplayNumberUpdated");
});
$("#compareForm").on("change", "select.displayNumber", function () {
    var a = $(this).val();
    $.facetBuilder.setNewDisplayCt(a);
    GCI.digitalData.analyticsData.displayPerPage = a;
    globalDispatchEvent("plpDisplayNumberUpdated");
});
$("#compareForm").on("change", ".sortBy select", function () {
    var b = $(this),
        d = b.val(),
        c = $("#compareForm .sortBy select").index(b),
        a = b.children("option:selected").text();
    $.facetBuilder.setNewSortBy(d);
    GCI.digitalData.analyticsData.sortByType = a;
    globalDispatchEvent("plpSortByTypeUpdated");
    conditionalScroll(b);
});
$("#compareForm").on("click", ".searchPagination a", function (d) {
    d.preventDefault();
    var a = $(this),
        c = $.trim(a.text().replace("< ", "").replace("<", "")).toLowerCase().substr(0, 4),
        b = a.parents(".searchPagination").find(".pageSelected");
    switch (c) {
        case "prev":
            c = parseInt(b.text()) - 1;
            break;
        case "next":
            c = parseInt(b.text()) + 1;
    }
    if (!a.hasClass("pageSelected") && !a.hasClass("disabled")) {
        $.facetBuilder.setNewPage(c);
        GCI.digitalData.omnitureData.prop15 = c.toString();
        globalDispatchEvent("ajaxPlpPagination");
        conditionalScroll(a);
    }
});

function setSelected(b) {
    var d = b.parent().attr("class"),
        a = $("." + d).find("a"),
        c = a.eq(0).text();
    $("#displayNumber .selected").removeClass("selected");
    $.facetBuilder.setNewDisplayCt(c);
    conditionalScroll(b);
    a.each(function () {
        if (!$(this).hasClass("selected")) {
            $(this).addClass("selected");
        }
    });
}
$("#priceRangeTo").preventKeyCode({
    keys: "13, 169",
    callback: function () {
        $("#setPriceRange").click();
    }
});

function conditionalScroll(a) {
    if (a.closest("#searchPaginationbottom").length || a.closest("fieldset.view.bottom").length || a.closest(".results-options.-top").length) {
        try {
            var c = $("#narrowSideBar").offset().top - 130;
            $.scrollTo(c, 600, {
                axis: "y"
            });
        } catch (b) {
            clog("Unable to set offset");
            $.scrollTo("#narrowSideBar", 600, {
                axis: "y"
            });
        }
    }
}
$(document).bind("criteoReady", function () {
    $(document).trigger("criteoFire", ["browse"]);
});
$(".related").on("click", ".relatedSeeLess, .relatedSeeMore", function (f) {
    f.preventDefault();
    var d = $(this),
        c = d.closest("ul"),
        b = c.find(".hidden"),
        a = c.find(".more");
    if (d.hasClass("relatedSeeMore")) {
        d.parent().remove();
        b.removeClass("hidden").addClass("more");
        c.append('<li><a href="" class="relatedSeeLess">See Less</a></li>');
    } else {
        a.removeClass("more").addClass("hidden");
        d.attr("class", "relatedSeeMore").text("See More");
    }
});
var seeMoreRelated = 1;
$(".relatedCategories .seeMoreRelated a").bind("click", function (c) {
    c.preventDefault();
    var b = $(this);
    var a = $(".relatedCategories .moreRelatedCategories");
    if (seeMoreRelated) {
        b.text("See Less");
        seeMoreRelated = 0;
        a.show();
    } else {
        b.text("See More");
        a.hide();
        seeMoreRelated = 1;
    }
});
var relatedLinksUL = $(".relatedCategories ul");
var relatedLinksContainer = $(".relatedCategories .link-container");
if (relatedLinksUL.width() > relatedLinksContainer.width()) {
    $(".relatedCategories .seeMoreRelatedGC").fadeIn("slow");
}
$(".relatedCategories .seeMoreRelatedGC").bind("click", function (c) {
    c.preventDefault();
    var b = $(this);
    var a = !b.hasClass("seeMoreBack") ? relatedLinksUL.width() - relatedLinksContainer.width() + 85 : 0;
    b.toggleClass("seeMoreBack");
    relatedLinksUL.animate({
        right: "" + a + "px"
    }, "slow");
});

function findstores() {
    var value = $("#zipAndCityState").val();
    $.ajax({
        type: "GET",
        url: "/ajax/storeLocation/findStoreLocation.jsp",
        cache: false,
        data: "zipAndCityState=" + value,
        dataType: "text",
        success: function (data) {
            data = data.replace(/\r?\n|\r/g, "");
            try {
                data = eval("(" + data + ")");
            } catch (e) {
                clog("Error: ", "could not parse findstores JSON response: " + e.message);
                return;
            }
            if (data.hasOwnProperty("error")) {
                $("#findstoreErr").html(data.error).show();
                $("#facet_800000").html("");
                return;
            }
            $("#findstoreErr").html("").hide();
            var facets = "";
            $.each(data, function (i, item) {
                facets += "<li class='inactive' id='store_" + item.demensionId + "'><a rel='" + item.demensionId + "'>" + item.name + "(" + item.distance + " mi)</a></li>";
                if (i == 3) {
                    facets += "<li class='jq-viewMore'>View More</li>";
                    return false;
                }
            });
            $("#facet_800000").html(facets);
            $(".jq-viewMore").on("click", function () {
                findstoresmore();
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("We apologize. There was an error trying to locate stores.");
            clog("findstores Error: ", xhr, textStatus, errorThrown);
        }
    });
}

function findstoresmore() {
    var value = $("#zipAndCityState").val();
    $.ajax({
        type: "GET",
        url: "/ajax/storeLocation/findStoreLocation.jsp",
        cache: false,
        data: "zipAndCityState=" + value,
        dataType: "text",
        success: function (data) {
            data = data.replace(/\r?\n|\r/g, "");
            try {
                data = eval("(" + data + ")");
            } catch (e) {
                clog("Error: ", "could not parse findstoresmore JSON response: " + e.message);
                return;
            }
            if (data.hasOwnProperty("error")) {
                $("#findstoreErr").html(data.error).show();
                $("#facet_800000").html("");
                return;
            }
            $("#findstoreErr").html("").hide();
            var facets = "";
            $.each(data, function (i, item) {
                facets += "<li class='inactive' id='store_" + item.demensionId + "'><a rel='" + item.demensionId + "'>" + item.name + "(" + item.distance + " mi)</a></li>";
            });
            facets += "<li class='jq-viewLess'>View Less</li>";
            $("#facet_800000").html(facets);
            $(".jq-viewLess").on("click", function () {
                findstores();
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("We apologize. There was an error trying to locate stores.");
            clog("findstoresmore Error: ", xhr, textStatus, errorThrown);
        }
    });
}

function searchStore(zip) {
    var zipcode = zip;
    if (zip == null || zip == "") {
        zipcode = $("#zipAndCityState").val();
    }
    if (zipcode == null || zipcode == "") {
        alert("Please enter a Zip Code to search.");
        return;
    }
    var radius = $("#distance").val();
    var skuId = $("#skuIdText").val();
    var homeStoreId = $("#homeStoreId").val();
    var pageType = $("#pageType").val();
    $.ajax({
        type: "GET",
        url: "/ajax/storeLocation/findStoreLocation.jsp",
        cache: false,
        data: "zipAndCityState=" + zipcode + "&radius=" + radius + "&skuId=" + skuId,
        dataType: "text",
        success: function (data) {
            var obj = "";
            data = data.replace(/\r?\n|\r/g, "");
            try {
                data = eval("(" + data + ")");
            } catch (e) {
                clog("Error: ", "could not parse searchStore JSON response: " + e.message);
                return;
            }
            $("#zipAndCityState").val(zipcode);
            if (data.hasOwnProperty("error")) {
                alert("Please enter a valid Zip Code to search.");
                return;
            }
            $.each(data, function (i, store) {
                var newclass = "",
                    noAvaliable = "";
                if (i == 0) {
                    newclass = "active";
                }
                if (pageType == null || pageType == "") {
                    noAvaliable = "no-avaliable";
                }
                var content = '<div class="list-item ' + newclass + '"><div class="item-info ' + noAvaliable + '"><span>' + store.name + "</span><span>" + store.city + "," + store.state + "</span><span>" + store.distance + store.distanceUnit + "</span></div>";
                var avaliable = "";
                if (pageType != null && pageType != "") {
                    avaliable = "<div class='available-now'>" + store.avaliable + "</div> ";
                }
                content += avaliable;
                content += "<div class='item-show'>";
                var storeDetail = "";
                storeDetail = '<div class="address"><p class="name">' + store.name + "</p><p>" + store.address + "</p><p>" + store.city + "," + store.state + " " + store.zipCode + "</p><p> Phone: " + store.phone + "</p>";
                var homeStore = "";
                if (homeStoreId != null && homeStoreId == store.storeId) {
                    homeStore = "<label style='color:#333;'>Make this my home store</label>";
                } else {
                    homeStore = "<p><a href='javascript:void(0)' onclick='setHomeStore(" + store.storeId + ")'>Make this my home store</a></p>";
                }
                storeDetail += homeStore;
                var mapDirections = "";
                if (store.hasOwnProperty("mapURL")) {
                    mapDirections = '<p><a href="' + store.mapURL + '" target="_blank">Map & Directions</a></p>';
                }
                storeDetail += mapDirections;
                storeDetail = storeDetail + "</div>";
                var images = "";
                if (store.hasOwnProperty("images")) {
                    var len = store.images.length;
                    var temImages = "";
                    for (var j = 0; j < len; j++) {
                        temImages += '<img alt="' + store.name + '" src="' + store.images[j].image + '"/>';
                    }
                    images = '<div class="image">' + temImages + "</div>";
                }
                storeDetail += images;
                var opendays = "";
                if (store.hasOwnProperty("openDays")) {
                    var len = store.openDays.length;
                    var tempOpenDays = "";
                    for (var j = 0; j < len; j++) {
                        tempOpenDays += "<span>" + store.openDays[j].openDay + "</span>";
                    }
                    opendays = '<div class="openDay"><label>Store Hours: </label>' + tempOpenDays + "</div>";
                }
                storeDetail += opendays;
                storeDetail = storeDetail + '<div class="email"><a href="#" class="styleBtn">Email Store</a></div>';
                content += storeDetail + "</div>";
                content += "</div>";
                if (i == 0) {
                    $(".show-itme-right-content").html(storeDetail);
                }
                obj += content;
            });
            $(".list-item-content").html(obj);
            $(".list-item-content .list-item").on("click", function () {
                $(".show-itme-right-content").html($(this).children(".item-show").html());
                $(this).addClass("active").siblings().removeClass("active");
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            clog("searchStore Error : ", xhr, textStatus, errorThrown);
        }
    });
}

function setHomeStore(a) {
    $("#homeStore").val(a);
    $("#setHomeStoreForm").submit();
}

function filterStoreByState(a) {
    $("#storeState").val(a);
    var b = new Array();
    $('input[name="storeServices"]:checked').each(function () {
        b.push($(this).val());
    });
    $("#storeServiceStr").val(b.join(","));
    $("#storeFinderForm").submit();
}
$(".checkbox-content input[type='checkbox']").on("click", function () {
    if ($(this).prop("checked") === true && $(this).attr("data-showAll") == "false") {
        $(this).siblings("input[type='checkbox']").removeAttr("checked");
    } else {
        $(this).siblings("input[type='checkbox']").last().removeAttr("checked");
    }
});
$("#change-store").moreSuperBox({
    width: 660,
    height: 420,
    callback: function () {
        $(".list-item-content .list-item").on("click", function () {
            $(".show-itme-right-content").html($(this).children(".item-show").html());
            $(this).addClass("active").siblings().removeClass("active");
        });
    }
});
$("#updateLocationButton").click(function (c) {
    c.preventDefault();
    var b = $.trim($("#updateLocationText").val()) === "zip code" ? "" : $.trim($("#updateLocationText").val());
    var a = {
        data: {
            zipAndCityState: b,
            radiusRange: $("#updateRadiusRange").val(),
            skuId: $("#skuIdText").val(),
            pageType: $("#pageType").val()
        }
    };
    if (!a.data.zipAndCityState) {
        alert("Please enter a valid zip code.");
        return false;
    }
    storeFinderPopup(a);
});
var storeDisplayPlpURL = "/storeLocation/storeDisplay.jsp";

function storeDisplayPopupPlp(a) {
    $("<div />").inlinePopup({
        width: 428,
        roundedCorners: false,
        url: storeDisplayPlpURL + "?locationId=" + a,
        customId: "storeDisplayPopup",
        callback: function () {
            $(".pop-store-outter-div").on("click", "#btnChooseStore", function (b) {
                b.preventDefault();
                $("#main").find(".alertBox").remove();
                $(".close").click();
            });
        }
    }).click();
}
$(document).on("click", ".storeDisplayPop", function (b) {
    b.preventDefault();
    var a = $(this).parent().find(".locationId").text();
    storeDisplayPopupPlp(a);
});
(function (b) {
    var c = 2;
    var j = 3;
    var e = 4;
    var f = 5;
    var k = [{
        substring: "DEFAULT",
        className: ""
    }, {
        substring: "From",
        className: "priceRange"
    }, {
        substring: "Add to Cart",
        fullString: "Add to Cart to See Price",
        className: "addToCartForPrice"
    }, {
        substring: "Call",
        fullString: "Call for Price",
        className: "callForPrice"
    }, {
        substring: "Email",
        fullString: "Email for Price",
        className: "emailPrice"
    }, {
        substring: "incheckout",
        fullString: "See Checkout For Final Price",
        className: "inCheckoutPromo"
    }];
    b.fn.stylesPreviewer = function (l) {
        var m = b.extend({
            selectors: {
                jsonData: ".stylesData",
                parent: ".product",
                thumb: ".thumb",
                title: ".productTitle a",
                link: ".thumb a",
                moreLinks: ".productTitle a",
                priceContainer: ".priceContainer",
                productPrice: ".productPrice",
                onSalePrice: ".maxSavingsMSRP",
                priceDropPrice: ".productMSRP",
                listAlias: "#listPriceLabel",
                usedAlias: "#usedLableAliasVar",
                productCondition: ".productCondition",
                list: "ul",
                listItem: "li"
            },
            bodyHasStylesClass: "showStyleOptions",
            stickerDivClass: "stickerWrap",
            noStickerDivClass: "productTag",
            thumbWidth: 220,
            thumbHeight: 220,
            thumbRank: "00",
            thumbVariationSuffix: "",
            styleNameDelimiter: " - ",
            activeClass: "selected",
            lazyClass: "lazy-mini",
            carouselClass: "owl-carousel",
            maxWithoutCarousel: 4,
            defaultIndex: 0,
            linkThumbs: true,
            clickThroughThumbs: true
        }, l);
        return this.each(function () {
            var T = b(this);
            var K = T.closest(m.selectors.parent);
            var B = K.find(m.selectors.thumb),
                G = B.find("img");
            var J = K.find(m.selectors.title);
            var F = K.find(m.selectors.link),
                Q = K.find(m.selectors.moreLinks);
            var M = 0,
                s = false,
                E, Y = 0,
                P = 500;
            var R, o = 0,
                N = true,
                A = false;
            var q, I, H;
            var L = "";
            var v = {
                textData: {
                    displayedTitle: "",
                    originalTitle: "",
                    $productConditionDiv: K.find(m.selectors.productCondition),
                    displayedCondition: "",
                    originalCondition: "",
                    noNameText: "Style Variation"
                },
                thumbData: {
                    imageID: "",
                    src: "",
                    dimensionString: m.thumbWidth + "x" + m.thumbHeight,
                    suffix: m.thumbRank + "-" + m.thumbWidth + "x" + m.thumbHeight + m.thumbVariationSuffix
                },
                priceData: {
                    $priceContainerDiv: K.find(m.selectors.priceContainer),
                    $productPriceDiv: K.find(m.selectors.productPrice),
                    defaultPriceClass: "",
                    allPriceClasses: "",
                    startingTextSelector: ".startingAt",
                    currencyDivSelector: ".currency",
                    currencyDivClass: "currency",
                    decimalsDivClass: "decimals",
                    onSalePriceClass: m.selectors.onSalePrice.substring(1, m.selectors.onSalePrice.length),
                    labelAliases: {
                        used: "Used:",
                        list: "Was:"
                    },
                    savingsHtml: "",
                    defaultSavingsHtml: "",
                    productPriceHtml: "",
                    defaultProductPriceHtml: ""
                },
                linkData: {
                    originalUrl: "",
                    activeSkuUrl: ""
                },
                stickerData: {
                    stickerBaseClass: "stickerText",
                    $stickerDiv: K.find("." + m.stickerDivClass).length > 0 ? K.find("." + m.stickerDivClass) : K.find("." + m.noStickerDivClass),
                    stickerText: "",
                    displayHtml: "",
                    defaultHtml: "",
                    className: "",
                    defaultClassName: "",
                    url: "",
                    defaultUrl: "",
                    description: ""
                }
            };
            var W;
            var S = function () {
                try {
                    L = parseJSONData(T.find(m.selectors.jsonData));
                    if (b.isEmptyObject(L)) {
                        clog("Item contains no style data");
                        return;
                    }
                    M = L.styleOptions.length;
                } catch (Z) {
                    clog("Unable to parse JSON: " + Z.message);
                    return;
                }
                if (M > 1) {
                    b("body").addClass(m.bodyHasStylesClass);
                    V();
                    u();
                    X(o, N);
                    r();
                    if (M > m.maxWithoutCarousel) {
                        q.addClass(m.carouselClass);
                        s = true;
                    }
                }
            };
            var V = function () {
                var ag = v.thumbData,
                    ah = v.linkData,
                    ac = v.priceData,
                    ae = v.textData,
                    Z = v.stickerData;
                ae.originalTitle = L.defaultDisplayName;
                ae.originalCondition = ae.$productConditionDiv.text();
                ag.imageID = L.thumbImageID + "-";
                ag.src = G.attr("data-original");
                W = L.styleThumbWidth + "x" + L.styleThumbHeight;
                if (b.trim(b(m.selectors.usedAlias).text()) != "") {
                    ac.labelAliases.used = b.trim(b(m.selectors.usedAlias).text());
                }
                if (b.trim(b(m.selectors.listAlias).text()) != "") {
                    ac.labelAliases.list = b.trim(b(m.selectors.listAlias).text());
                }
                var af = ac.$priceContainerDiv.find(m.selectors.onSalePrice).length ? ac.$priceContainerDiv.find(m.selectors.onSalePrice)[0].outerHTML : "";
                var aa = ac.$priceContainerDiv.find(m.selectors.priceDropPrice).length ? ac.$priceContainerDiv.find(m.selectors.priceDropPrice)[0].outerHTML : "";
                ac.defaultSavingsHtml = af + aa;
                ac.currencySymbol = ac.$productPriceDiv.find(ac.currencyDivSelector).text();
                ac.defaultProductPriceHtml = ac.$productPriceDiv.html();
                for (var ad = 0; ad < k.length; ad++) {
                    if (ac.$productPriceDiv.hasClass(k[ad].className)) {
                        ac.defaultPriceClass = k[ad].className;
                    }
                    ac.allPriceClasses += k[ad].className + " ";
                }
                ah.originalUrl = F.attr("href");
                var ai = Z.$stickerDiv.hasClass(Z.stickerBaseClass);
                if (ai) {
                    var ab = Z.$stickerDiv.attr("class").split(/\s+/);
                    b.each(ab, function (aj, ak) {
                        if (ak !== Z.stickerBaseClass) {
                            Z.defaultClassName = ak;
                        }
                    });
                }
                Z.defaultHtml = Z.$stickerDiv[0].outerHTML;
            };
            var u = function () {
                var aa = v.thumbData,
                    ae = "",
                    ac = "",
                    Z = "";
                ae = "<" + m.selectors.list + ">";
                for (var ab = 0; ab < M; ab++) {
                    var ad = L.styleOptions[ab];
                    if (m.linkThumbs) {
                        ac = '<a href="' + ad.skuUrl + '">';
                        Z = "</a>";
                    }
                    ae += "<" + m.selectors.listItem + " data-index='" + ab + "'>" + ac;
                    if (s) {
                        ae += "<img alt='" + ad.name + "' src=" + ad.placeholder + " class='" + m.lazyClass + " img-responsive' data-original='" + ad.assetPath + "'>";
                    } else {
                        ae += "<img alt='" + ad.name + "' src=" + ad.assetPath + " class='img-responsive'>";
                    }
                    ae += Z + "</" + m.selectors.listItem + ">";
                    if (ad.assetPath.indexOf(aa.imageID) >= 0) {
                        R = o = ab;
                    }
                    ad.thumbAssetPath = ad.assetPath.replace(W, aa.dimensionString);
                }
                ae += "</" + m.selectors.list + ">";
                T.append(ae);
                q = T.find(m.selectors.list);
                I = q.children();
                H = I.length;
            };
            var r = function () {
                for (var ab = 0; ab < H; ab++) {
                    var aa = b(I[ab]),
                        Z = aa.find("a");
                    aa.attr("data-index", ab);
                    if (!m.clickThroughThumbs) {
                        aa.click(function (ac) {
                            ac.stopPropagation();
                            o = b(this).attr("data-index");
                            N = false;
                            X(o);
                            return false;
                        });
                    }
                    aa.on("mouseenter", function (ac) {
                        X(b(this).attr("data-index"));
                    });
                    aa.on("mouseleave", function (ad) {
                        var ac = b(this);
                        if (!O(ad, ac)) {
                            X(o, N);
                        }
                    });
                    if (m.linkThumbs && !m.clickThroughThumbs) {
                        Z.click(function (ac) {
                            ac.preventDefault();
                        });
                    }
                }
                q.on("mouseleave", function (ac) {
                    X(o, N);
                });
                q.on("mouseenter", function (ac) {
                    if (!A) {
                        z();
                    }
                });
                T.on("CAROUSEL_READY", function (ad, ac) {
                    E = b(ac);
                    Y = Math.floor(o / m.maxWithoutCarousel);
                    if (Y > 0) {
                        setTimeout(function () {
                            E.trigger("to.owl.carousel", [Y, 10, false]);
                        }, P);
                    }
                });
            };
            var X = function (aa, Z) {
                K.find(m.selectors.listItem).removeClass(m.activeClass);
                var ab = b(I[aa]);
                ab.addClass(m.activeClass);
                U(aa);
                w(aa, Z);
                p(aa, Z);
                C(aa, Z);
                D(aa, Z);
            };
            var U = function (Z) {
                var ab = L.styleOptions[Z];
                var aa = v.thumbData;
                aa.src = ab.thumbAssetPath;
                G.attr("src", aa.src);
            };
            var w = function (ad, Z) {
                var ac = v.priceData;
                ac.$productPriceDiv.removeClass(ac.allPriceClasses);
                if (Z) {
                    ac.savingsHtml = ac.defaultSavingsHtml;
                    ac.productPriceHtml = ac.defaultProductPriceHtml;
                    ac.$productPriceDiv.addClass(ac.defaultPriceClass);
                } else {
                    var ae = L.styleOptions[ad],
                        ab = ae.priceVisibility,
                        ag = L.inCheckoutPromo,
                        ah = false,
                        ai = ae.sku.replace(/sku:/g, ""),
                        aa = ae.regularPrice ? parseFloat(ae.regularPrice.replace(",", "")) : "",
                        af = ae.price ? parseFloat(ae.price.replace(",", "")) : "";
                    if (ag.indexOf(ai) > -1) {
                        ah = true;
                    }
                    switch (ab) {
                        case "1":
                            if (ah === false) {
                                ac.productPriceHtml = '<span class="screen-reader-only">Price:</span><span class="' + ac.currencyDivClass + '">' + pageData.currencySymbol + "</span>" + ae.price;
                            } else {
                                ac.$productPriceDiv.addClass(k[f].className);
                                ac.productPriceHtml = k[f].fullString;
                            }
                            break;
                        case "2":
                            ac.$productPriceDiv.addClass(k[c].className);
                            ac.productPriceHtml = k[c].fullString;
                            break;
                        case "3":
                            ac.$productPriceDiv.addClass(k[j].className);
                            ac.productPriceHtml = k[j].fullString;
                            break;
                        case "4":
                            ac.$productPriceDiv.addClass(k[e].className);
                            ac.productPriceHtml = k[e].fullString;
                            break;
                        default:
                            ac.productPriceHtml = "";
                    }
                    if (typeof ae.onSale !== "undefined" && ae.onSale === "true" && ae.regularPrice && ah === false && (ae.regularPrice > ae.price || aa > af)) {
                        ac.savingsHtml = '<span class="' + ac.onSalePriceClass + '">' + ac.labelAliases.list + "&nbsp;" + pageData.currencySymbol + ae.regularPrice + "</span>";
                    } else {
                        if (t(ae)) {
                            ac.savingsHtml = '<span class="' + ac.onSalePriceClass + '">' + ac.labelAliases.list + '&nbsp;<span aria-label="Was Price">' + MFI.NumberUtils.formatPrice(ae.wasPrice, false) + "</span></span>";
                            ac.savingsHtml += '<span class="' + ac.onSalePriceClass + '">Price Drop:&nbsp;<span aria-label="Price Drop:">' + MFI.NumberUtils.formatPrice(ae.priceDropPrice, false) + "</span></span>";
                        } else {
                            ac.savingsHtml = "";
                        }
                    }
                }
                ac.$priceContainerDiv.find(m.selectors.onSalePrice).remove().find(m.selectors.priceDropPrice).remove();
                ac.$productPriceDiv.after(ac.savingsHtml);
                ac.$productPriceDiv.html(ac.productPriceHtml);
            };

            function t(Z) {
                return (Z.priceDrop === "true" && Z.wasPrice && MFI.NumberUtils.isNumber(Z.wasPrice) && Z.price && Z.price && Z.priceDropPrice && MFI.NumberUtils.isNumber(Z.priceDropPrice) && Z.onSale !== "true" && Z.wasPrice > Z.price);
            }
            var p = function (aa, Z) {
                var ad = v.textData;
                if (Z) {
                    ad.displayedTitle = ad.originalTitle;
                    ad.displayedCondition = ad.originalCondition;
                } else {
                    var ac = L.styleOptions[aa];
                    var ab = ac.name != "" ? ac.name : ad.noNameText + " " + aa;
                    ad.displayedTitle = ad.originalTitle + m.styleNameDelimiter + ab;
                    ad.displayedCondition = ac.condition;
                }
                J.html(ad.displayedTitle);
                ad.$productConditionDiv.html(ad.displayedCondition);
            };
            var C = function (ab, Z) {
                var ac = L.styleOptions[ab];
                var aa = v.linkData;
                if (Z) {
                    aa.activeSkuUrl = aa.originalUrl;
                } else {
                    aa.activeSkuUrl = ac.skuUrl;
                }
                F.attr("href", aa.activeSkuUrl);
            };
            var D = function (aa, Z) {
                var ac = L.styleOptions[aa];
                var ab = v.stickerData;
                if (Z) {
                    ab.className = ab.defaultClassName;
                    ab.html = ab.defaultHtml;
                } else {
                    ab.stickerText = ac.stickerDisplayText;
                    ab.stickerClass = ac.stickerClass;
                    ab.stickerUrl = ac.stickerDisplayUrl;
                    ab.stickerDesc = ac.stickerDisplayDesc;
                    ab.html = ab.stickerText ? '<div class="' + m.stickerDivClass + '"><div class="' + ab.stickerBaseClass + " " + ab.stickerClass + '"><span>' + ab.stickerText + "</span></div></div>" : '<div class="' + m.noStickerDivClass + '"></div>';
                }
                ab.$stickerDiv.remove();
                K.prepend(ab.html);
                ab.$stickerDiv = K.find("." + m.stickerDivClass).length > 0 ? K.find("." + m.stickerDivClass) : K.find("." + m.noStickerDivClass);
            };
            var O = function (ab, aa) {
                var Z = parseInt(aa.attr("data-index")) + 1;
                var ac = ab.offsetX > 0 ? "right" : ab.offsetX == 0 ? "none" : "left";
                if (!s && (ac == "right" && Z == M)) {
                    clog("out of bounds to the right");
                    return false;
                }
                return true;
            };
            var z = function () {
                var ab;
                if (A) {
                    return;
                }
                for (var aa = 0; aa < M; aa++) {
                    ab = L.styleOptions[aa];
                    var Z = new Image();
                    Z.src = ab.thumbAssetPath;
                }
                A = true;
            };
            S();
        });
    };
    window.MFIstyles = window.MFIstyles || {};
    var a = window.MFIstyles;
    a.OwlCarousel = function () {
        var m = b(".styles-carousel .owl-carousel:not(.owl-loaded)"),
            o = ["<span aria-label='previous' role='Carousel Controls'></span>", "<span aria-label='next' role='Carousel Controls'></span>"];

        function l(p) {
            b(p.target).parent().trigger("CAROUSEL_READY", [p.target]);
        }
        m.each(function () {
            var r = b(this),
                p = r.parent(),
                s = 4,
                q = {
                    loop: false,
                    margin: 0,
                    lazyLoad: true,
                    rewind: false,
                    slideBy: "page",
                    dots: false,
                    responsive: {
                        0: {
                            items: s
                        }
                    },
                    nav: true,
                    navText: o,
                    onInitialized: l
                };
            MFI.OwlCarousel.initSingleCarousel(r, q);
        });
    };
    var g = b("#gridRendered"),
        h = "showStyleOptions";
    window.gridStylesRenderedOnce = g.length && g.text() === "true";
    b(document).one("gridRendered.onload", function () {
        g.text("true");
        window.gridStylesRenderedOnce = true;
        d();
    });
    b(document).on("gridRendered", function () {
        d();
    });

    function d() {
        b("body").removeClass(h);
        b(".styles-carousel").stylesPreviewer();
        b(".styles-carousel").find("img.lazy-mini").lazyload({
            effect: "fadeIn",
            skip_invisible: false,
            threshold: 20
        });
        a.OwlCarousel();
    }
    if (!window.gridStylesRenderedOnce && g.length) {
        b(document).trigger("gridRendered.onload");
    }
})(jQuery);