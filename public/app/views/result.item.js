define([
        'app',
        'text!templates/result.item.html'
    ],
    function (app, tmpl) {
        'use strict';

        var View = Backbone.Marionette.ItemView.extend({

            template: function () {
                var data = {
                    resultItem: this.model,
                    id: this.model.get("ClassName").replace(/\./g, "_"),
                    enumItems: this.model.get("enumItems"),
                    shouldExpand: this.model.get("shouldAutoExpand")
                };

                return _.template(tmpl, data, {variable: 'data'});
            },

            tagName: "div",
            attributes: function () {
                var hideEntirePanelCss = this.shouldShow() ? "" : "hidden";
                return {
                    "class": "panel panel-default " + hideEntirePanelCss
                }
            },

            shouldShow: function () {

                this.model.set("shouldAutoExpand", false);

                var shouldShow = false;
                var shouldAutoExpand = false;

                var shortClassName = _.last(this.model.get("ClassName").split(/\./)); // shorten the class name to look better
                this.model.set("displayClassName", this.highlightLabel(shortClassName, app.currentSearchTerm));

                if (app.currentSearchTerm.length < 1)
                    return true;


                // check if the heading has a match
                shouldShow = this.isMatch(shortClassName);

                var _this = this;
                var _model = this.model;
                // check if one of the enum names has a match
                _.each(this.model.get("enumItems"), function (enumItem) {

                    enumItem.displayClassName = _this.model.get("displayClassName");
                    enumItem.displayEnumName = _this.highlightLabel(enumItem.enumName, app.currentSearchTerm);

                    if (_this.isMatch(enumItem.enumName)) {
                        shouldShow = true;
                        enumItem.highlight = true;

                        _model.set("shouldAutoExpand", true);
                    }

                    // now check if any of the field keys or values have matches
                    enumItem.hasMatchingFields = false;
                    _.each(enumItem.fieldList, function (fieldItem) {

                        fieldItem.highlightKey = false;
                        fieldItem.highlightValue = false;

                        fieldItem.displayKey = _this.highlightLabel(fieldItem.Key, app.currentSearchTerm);
                        fieldItem.displayValue = _this.highlightLabel(fieldItem.Value, app.currentSearchTerm);

                        if (_this.isMatch(fieldItem.Key)) {
                            shouldShow = true;
                            _model.set("shouldAutoExpand", true);
                            enumItem.hasMatchingFields = true;
                            fieldItem.highlightKey = true;
                        }

                        if (_this.isMatch(fieldItem.Value)) {
                            shouldShow = true;
                            _model.set("shouldAutoExpand", true);
                            fieldItem.highlightValue = true;
                            enumItem.hasMatchingFields = true;
                        }

                    });
                });

                return shouldShow;
            },

            highlightLabel: function (label, term) {

                return label.replace(new RegExp(term, "i"), '<span class="highlight">' + term + '</span>');

            },

            isMatch: function (str) {
                str = str + "";
                return (str.search(new RegExp(app.currentSearchTerm, 'i')) > -1);
            },

            events: {
                "click button": "addToPinned"
            },

            addToPinned: function (e) {
                var enumName = ($(e.currentTarget).attr("id")).replace("btn_", "");
                var _this = this;


                _.each(this.model.get("enumItems"), function (item) {
                    if (item.enumName == enumName) {
                        app.pinnedData.add(item);
                        return;

                    }
                });
            },

            initialize: function () {
                _.bindAll(this, 'template');
            }

        });

        return View;
    });