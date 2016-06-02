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

                var regex = new RegExp(app.currentSearchTerm, 'i'); // define regex here to avoid recalcing all the time
                this.model.set("shouldAutoExpand", false);

                var shouldShow = false;
                var shouldAutoExpand = false;

                var shortClassName = _.last(this.model.get("ClassName").split(/\./)); // shorten the class name to look better
                this.model.set("displayClassName", this.highlightLabel(shortClassName, app.currentSearchTerm));

                if (app.currentSearchTerm.length < 1)
                    return true;


                // check if the heading has a match
                shouldShow = this.isMatch(shortClassName, regex);

                var _this = this;
                var _model = this.model;

                // check if one of the enum names has a match
                _.each(this.model.get("enumItems").models, function (enumItem) {


                    enumItem.set("displayClassName", _model.get("displayClassName"));
                    enumItem.set("displayEnumName", _this.highlightLabel(enumItem.get("enumName"), app.currentSearchTerm));


                    if (_this.isMatch(enumItem.get("enumName"), regex)) {
                        shouldShow = true;
                        enumItem.set("highlight", true);
                        _model.set("shouldAutoExpand", true);
                    }

                    // now check if any of the field keys or values have matches
                    enumItem.set("hasMatchingFields", false);

                    _.each(enumItem.get("fieldList").models, function (fieldItem) {

                        fieldItem.set("highlightKey", false);
                        fieldItem.set("highlightValue", false);

                        fieldItem.set("displayKey", _this.highlightLabel(fieldItem.get("Key"), app.currentSearchTerm));
                        fieldItem.set("displayValue", _this.highlightLabel(fieldItem.get("Value"), app.currentSearchTerm));

                        if (_this.isMatch(fieldItem.get("Key"), regex)) {
                            shouldShow = true;
                            _model.set("shouldAutoExpand", true);
                            enumItem.set("hasMatchingFields", true);
                            fieldItem.set("highlightKey", true);
                        }

                        if (_this.isMatch(fieldItem.get("Value"), regex)) {
                            shouldShow = true;
                            _model.set("shouldAutoExpand", true);
                            enumItem.set("hasMatchingFields", true);
                            fieldItem.set("highlightValue", true);
                        }

                    });
                });
                this.model.set("shouldShow",shouldShow);
                return shouldShow;
            },

            highlightLabel: function (label, term) {

                var regex = new RegExp(term, "i");
                var match = regex.exec(label);

                if (match) {
                    return label.replace(new RegExp(term, "i"), '<span class="highlight">' + match[0] + '</span>');
                }
                return label;


            },

            isMatch: function (str, regEx) {
                return (str.search(regEx) > -1);
            },

            events: {
                "click button": "addToPinned"
            },

            addToPinned: function (e) {
                var enumName = ($(e.currentTarget).attr("id")).replace("btn_", "");
                var _this = this;

                _.each(this.model.get("enumItems").models, function (item) {
                    if (item.get("enumName") == enumName) {
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