// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> 简介</a></li><li class="chapter-item expanded "><a href="preface.html"><strong aria-hidden="true">2.</strong> 前言</a></li><li class="chapter-item expanded "><a href="theory.html"><strong aria-hidden="true">3.</strong> 理论</a></li><li class="chapter-item expanded "><a href="time/index.html"><strong aria-hidden="true">4.</strong> 时间量化</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="time/timetrackio.html"><strong aria-hidden="true">4.1.</strong> TimeTrack.io(aTimelogger)</a></li><li class="chapter-item expanded "><a href="time/timeblock.html"><strong aria-hidden="true">4.2.</strong> 时间块</a></li></ol></li><li class="chapter-item expanded "><a href="emotion/index.html"><strong aria-hidden="true">5.</strong> 情绪量化</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="emotion/moodnotes.html"><strong aria-hidden="true">5.1.</strong> Moodnotes</a></li></ol></li><li class="chapter-item expanded "><a href="eating/index.html"><strong aria-hidden="true">6.</strong> 进食量化</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="eating/waterreminder.html"><strong aria-hidden="true">6.1.</strong> WaterReminder</a></li></ol></li><li class="chapter-item expanded "><a href="sleep/index.html"><strong aria-hidden="true">7.</strong> 睡眠量化</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">7.1.</strong> 硬件</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="sleep/apple-watch.html"><strong aria-hidden="true">7.1.1.</strong> Apple Watch</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.1.2.</strong> 手环</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.2.</strong> 软件</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="sleep/autosleep.html"><strong aria-hidden="true">7.2.1.</strong> AutoSleep</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.2.2.</strong> SleepCycle</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.2.3.</strong> Pillow</div></li></ol></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">8.</strong> 穿着量化</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">8.1.</strong> StyleBook</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">8.2.</strong> 简衣橱</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.</strong> 健康量化</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">9.1.</strong> 硬件</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">9.1.1.</strong> Apple Watch</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.1.2.</strong> 手环</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.1.3.</strong> 体脂秤</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.2.</strong> 软件</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">9.2.1.</strong> Apple 健康</div></li></ol></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.</strong> 专业手段</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">10.1.</strong> 睡眠</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.2.</strong> 情绪</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.3.</strong> 体脂</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.4.</strong> 体检</div></li></ol></li><li class="chapter-item expanded "><a href="books.html"><strong aria-hidden="true">11.</strong> 推荐书籍</a></li><li class="chapter-item expanded "><a href="contribute.html"><strong aria-hidden="true">12.</strong> 贡献本书</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.</strong> 关于作者</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="authors/bestony.html"><strong aria-hidden="true">13.1.</strong> 白宦成</a></li><li class="chapter-item expanded "><a href="authors/ffeels.html"><strong aria-hidden="true">13.2.</strong> 涂俊杰</a></li><li class="chapter-item expanded "><a href="authors/ghinyang.html"><strong aria-hidden="true">13.3.</strong> GhinYang</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
