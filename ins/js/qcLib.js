(function() {
	if (!window.qcLib) {
		window['qcLib'] = {};
	}
	function addEvent(node, type, listener) {
    	if (node.addEventListener) { // W3C-chrome、safari、opera
    		node.addEventListener(type, listener, false);
    		return true;
    	} else if (node.attachEvent) { // IE 私有
    		node['e'+type+listener] = listener;
    		node[type+listener] = function() {
    			node['e'+type+listener](window.event); // IE上的event是window的属性
    		};
    		node.attachEvent('on'+type, node[type+listener]);
    		return true;
    	};
    	return false;
    }
    window['qcLib']['addEvent'] = addEvent;

    function removeEvent(node, type, listener) {
    	if (node.removeEventListener) {
    		node.removeEventListener(type, listener, false);
    		return true;
    	} else if (node.detachEvent) {
    		node.detachEvent("on"+type, node[type+listener]);
    		node[type+listener] = null;
    		return true;
    	}
    	return false;
    }
    window['qcLib']['removeEvent'] = removeEvent;

    function insertAfter(node, referenceNode) {
        return referenceNode.parentNode.insertBefore(
    node, referenceNode.nextSibling
        );
    }
    window['qcLib']['insertAfter'] = insertAfter;

    function prependChild(parent, newChild) {
        if (parent.firstChild) {
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            parent.appendChild(newChild);
        }
        return parent;
    }
    window['qcLib']['prependChild'] = prependChild;

    function removeAllChildren(parent) {
        while (parent.firstChild) {
            parent.firstChild.parentNode.removeChild(parent.firstChild);
        }
        return parent;
    }
    window['qcLib']['removeAllChildren'] = removeAllChildren;

    function getBrowserWindowSize() {
        var de = document.documentElement;
        return {
            'width': (
                window.innerWidth
                || (de && de.clientWidth)
                || document.body.clientWidth
            ),
            'height': (
                window.innerHeight
                || (de && de.clientHeight)
                || document.body.clientHeight
            )
        }
    }
    window['qcLib']['getBrowserWindowSize'] = getBrowserWindowSize;

    
})();