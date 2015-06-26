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

var Stream = require('stream');

function parseHeader(obj) {
	var stream = Stream.Transform({objectMode: true});

	stream._transform = function(file, unused, callback) {
		file['test'] = 'something';
		console.log(file);
		callback(null, file);
	};

	return stream;
};

module.exports = parseHeader;
