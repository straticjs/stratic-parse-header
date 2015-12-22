/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var through2 = require('through2');
var md = require('markdown').markdown;
var concat = require('concat-stream');
var gutil = require('gulp-util');
var _ = require('lodash');

// TODO: this is, in general, extremely brittle

module.exports = function(data) {
	return through2.obj(function(file, enc, callback) {
		var that = this;
		file.pipe(concat(function(buf) {
			var tree = md.parse(buf.toString());
			if (tree[2][2] === 'Post information' &&
			    tree[4][2] === 'Post text') {
				// Parse metadata out of the Markdown
				var arr = tree[3][1].split('"');
				file.title = arr[1];
				var time = arr[3].split(' ');
				file.time = file.time || {};
				file.time.epoch = time[0];
				// TODO: should this be further parsed?
				file.time.utcoffset = time[time.length-1];
				file.author = arr[5];
				file.categories = arr[7].split(',').map(_.trim);

				// Slice the metadata out of the Markdown
				tree = [tree[0], tree[1]].concat(_.drop(tree, 5));

				// TODO: serialize tree back to Markdown

				that.push(file);
				callback();
			} else {
				throw new gutil.PluginError('stratic-parse-header', 'Stratic Markdown formatting not well-formed');
			}
		}));
	});
};
