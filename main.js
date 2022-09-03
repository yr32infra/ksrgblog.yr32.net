(function() {
	const TIPS = [
		'ティーダの……やっぱなんでもない…ｗｗ',
		'授業中に出したら終わるのは学生生活どころではないよな…🏫💩🩲',
		'らぎ虐のｷﾞｬｸって、虐待のｷﾞｬｸだったんだ！',
		'6時に起こされたと思ったのに9時だった。',
		'ゆるせね～～～！！！絶対今のチクチク言葉じゃん！！',
		'令和最新版！らぎのページへようこそ！',
		'…ウケるね。',
		'…ウケるね。(笑)',
		'…そういうこともあるんじゃないかな。',
		'ありえね～～～！！！',
	];

	const REPLACES = [
		{
			from: /^\-+$/gm,
			to: '<hr style="width: 12.5%;">'
		},
		{
			from: /^([　◆]+)$/gm,
			to: '<div style="text-align: center; margin-top: 10px; margin-bottom: 10px;">$1</div>'
		},
		{
			from: /^(.+)$/gm,
			to: '<p>$1</p>'
		},
		{
			from: /\n\n\n+/g,
			to: '<div class=many-br-like-spacing></div>'
		},
		{
			from: /(?<!\<[^>]+)\n\n+/g,
			to: '<div class=thin-br-like-spacing></div>'
		},
		{
			from: /(?<!\<[^>]+)(（.+?）|\(.+?\))/g,
			to: '<span class="image-like softblink do-not-markup" title="$1.gif">$1</span>'
		},
		{
			from: /(?<!\<[^>]+)\{\{Warning\|(.+)\}\}/gi,
			to: '</p><div class=warning>$1</div><p>'
		},
		{
			from: /(?<!\<[^>]+)\[\[twitter:(.+)\|(.+)\]\]/gi,
			to: '<a href="https://twitter.com/$1" class="link-like do-not-markup" target=_blank>$2</a>'
		},
		{
			from: /(?<!\<[^>]+)\[\[tweet:(.+)\|(.+)\]\]/gi,
			to: '<a href="https://twitter.com/_/status/$1" class=link-like target=_blank>$2</a>'
		},
		{
			from: /(?<!\<[^>]+)\{\{twitter hashtag\|(.+)\}\}/gi,
			to: '<a href="https://twitter.com/hashtag/$1" class=link-like target=_blank>#$1</a>'
		},
		{
			from: /(?<!\<[^>]+)(@)([0-9_a-z]+)/gi,
			to: '<a href="https://twitter.com/$2" class="link-like do-not-markup" target=_blank>$1$2</a>'
		},
		{
			from: /(?<!\<[^>]+)⬛/g,
			to: '■',
		},
		{
			from: /(?<!\<[^>]+)([!■✕□])/g,
			to: '<span class="black-out image-like" title="$1.gif">$1</span>',
		},
		{
			from: /(?<!\<[^>]+)♡/g,
			to: "❤️",
		},
		{
			from: /(?<!\<[^>]+)(?<paren>(”|"))(.+?)\k<paren>/g,
			to: "<b>$1$3$1</b>",
		},
		{
			from: /(?<!\<[^>]+)(?<paren>(\*))(.+?)\k<paren>/g,
			to: "<b>$3</b>",
		},
		{
			from: /(?<!\<[^>]+)(「.+?」|［.+?］|〔.+?〕)/g,
			to: "<b>$1</b>",
		},
		{
			from: /(?<!\<[^>]+)\[(.+):(.+)\]:?/g,
			to: '</p><div class=warning><span class="blink image-like">$1</span>$2</div><p>'
		},
		{
			from: /(?<!\<[^>]+)(VRChat|evil|break|learned|T1|Windows(\d+)?|i\d(\-\d+)?|Q\d+|[\?？!！]+?|Twitter2?|Discord|インターネット|SAN値?(ピンチ)?|女装)/gi,
			to: '<span class="image-like colorful-rotate green fast do-not-markup" title="$1.gif">$1</span>'
		},
		{
			from: /(?<!\<[^>]+)(?<=\d)(:)(?=\d)/g,
			to: '<span class="image-like colorful-rotate blue fast" title="$1.gif">$1</span>'
		},
		{
			from: /(?<!\<[^>]+)(?<=\d)(\-)(?=\d)/g,
			to: '<span class="image-like colorful-rotate blue fast" title="$1.gif">$1</span>'
		},
		{
			from: /(?<!\<[^>]+)(?<=\d)(\.)(?=\d)/g,
			to: '<span class="image-like colorful-rotate blue fast" title="$1.gif">$1</span>'
		},
		{
			from: /(?<!\<[^>]+)(?<=\d)(,)(?=\d)/g,
			to: '<span class="image-like colorful-rotate blue fast" title="$1.gif">$1</span>'
		},
		{
			from: /(?<!\<[^>]+)(\d)/g,
			to: '<span class="image-like colorful-rotate blue fast" title="$1.gif">$1</span>'
		},
	];

	const htmlSanity = text => {
		const e = document.createElement('div');
		e.textContent = text;
		return e.innerHTML;
	};

	const dateTimeToString = dt => {
		if (dt == null) return 'null';
		let s = '';
		s += dt.getFullYear();
		s += '-'
		s += (dt.getMonth()+1).toString().padStart(2, '0');
		s += '-'
		s += dt.getDate().toString().padStart(2, '0');
		s += ' '
		s += dt.getHours().toString().padStart(2, '0');
		s += ':'
		s += dt.getMinutes().toString().padStart(2, '0');
		return s;
	};

	const applyArticle = (a, specified) => {
		if (a.created_at)
			document.getElementById('datetime').textContent =
				`作成日時: ${dateTimeToString(a.created_at)}`;

		if (a.created_at && a.updated_at)
			if (a.created_at.getTime() != a.updated_at.getTime()) {
				document.getElementById('datetime').textContent +=
					`\n更新日時: ${dateTimeToString(a.updated_at)}`;
			}

		document.getElementById('title').textContent = a.title;
		if (specified)
			document.title = `${a.title} ${document.title}`;
		else
			document.title = `${document.title}`;

		let bodyHTML = htmlSanity(a.body);

		REPLACES.forEach(v => {
			bodyHTML = bodyHTML.replace(v.from, v.to);
		});

		document.getElementById('body').innerHTML = bodyHTML;
	};

	const applyPager = links => {
		const prev = document.getElementById('prev');
		if (links.prev != null) {
			prev.href = links.prev;
			prev.classList.remove('not-allowed');
		}

		const next = document.getElementById('next');
		if (links.next != null) {
			next.href = links.next;
			next.classList.remove('not-allowed');
		}
	};

	const loadTips = () => {
		document.getElementById('tips').value =
			TIPS[Math.floor(Math.random() * TIPS.length)];
	};

	const documentReady = new Promise(resolve => {
		if (document.readyState != 'loading')
			resolve();

		document.addEventListener('DOMContentLoaded', () => {
			resolve();
		});
	});

	const fetchArticles = new Promise(resolve => {
		/** @type {string | null} */
		const articleName = new URLSearchParams(location.search).get('article');

		fetch('https://blog.ksrgte.ch/api/articles')
			.then(response => response.json())
			.then(data => {
				const articles = data.map(a => ({
					created_at: new Date(a.created_at),
					updated_at: new Date(a.updated_at),
					title: a.id,
					body: a.content,
				})).sort((a, b) => b.created_at - a.created_at);

				const articleTree = new Map();

				for (const a of articles) {
					const year = a.created_at.getFullYear().toString() + '年';
					const month = (a.created_at.getMonth()+1).toString()
						.padStart(2, '0') + '月';

					if (!articleTree.has(year))
						articleTree.set(year, new Map());

					if (!articleTree.get(year).has(month))
						articleTree.get(year).set(month, []);

					articleTree.get(year).get(month).push(a.title);
				}

				if (!articles.length) {
					resolve({
						article: { title: "204 No Content", body: "No Content" },
						links: { next: null, prev: null },
						since: new Date(new Date().getTime() - (1000*60*60*24*3)),
						articleTree: articleTree,
					});

					return;
				}

				let a, articleIndex, articleSpecified;

				const since = articles[articles.length-1].created_at;

				if (articleName == undefined) {
					a = articles[0];
					articleIndex = 0;

				} else {
					articleIndex = articles.findIndex(a => a.title == articleName);
					articleSpecified = true;

					if (articleIndex == -1) {
						resolve({
							article: { title: "404 Not Found", body: "Not Found" },
							links: { next: null, prev: null },
							since: since,
							articleTree: articleTree,
						});

						return;
					}

					a = articles[articleIndex];
				}


				resolve({
					article: a,
					links: {
						next: 0 < articleIndex ?
							`/?article=${articles[articleIndex-1].title}` : null,
						prev: articleIndex+1 < articles.length ?
							`/?article=${articles[articleIndex+1].title}` : null,
					},
					since: since,
					articleTree: articleTree,
					articleSpecified: articleSpecified,
				});
			}).catch((v) => {
				resolve({
					article: { title: v.message, body: "らぎサーバーから情報を取得できません。\n\nらぎがわるいかも。" },
					links: { next: null, prev: null },
					since: new Date(new Date().getTime() - (1000*60*60*24*3)),
					articleTree: new Map(),
				});
			});
	});

	const applyArticleTree = tree => {
		const te = document.getElementById('article-tree');
		te.innerHTML = '';

		for (const [year, monthTree] of tree.entries()) {
			const yearD = document.createElement('div');
			const yearI = document.createElement('input');
			yearI.type = 'checkbox';
			yearI.id = year;
			const yearS = document.createElement('label');
			yearS.textContent = year;
			yearS.htmlFor = year;
			yearD.appendChild(yearI);
			yearD.appendChild(yearS);

			let sum = 0;

			for (const [month, titleArray] of monthTree.entries()) {
				const monthD = document.createElement('div');
				const monthI = document.createElement('input');
				monthI.type = 'checkbox';
				monthI.id = `${year}${month}`;
				const monthS = document.createElement('label');
				monthS.textContent = `${month} (${titleArray.length}件)`;
				monthS.htmlFor = `${year}${month}`;
				sum += titleArray.length;
				monthD.appendChild(monthI);
				monthD.appendChild(monthS);

				const monthDD = document.createElement('div');
				const monthU = document.createElement('ul');

				for (const title of titleArray) {
					const titleL = document.createElement('li');
					const titleA = document.createElement('a');
					titleA.href = `/?article=${title}`
					titleA.textContent = title;
					titleA.classList.add('link-like');
					titleL.appendChild(titleA);
					monthU.appendChild(titleL);
				}

				monthDD.appendChild(monthU);
				monthD.appendChild(monthDD);
				yearD.appendChild(monthD);
			}

			yearS.textContent += ` (${sum}件)`;
			te.appendChild(yearD);
		}

		const firstYearI = te.querySelector('#article-tree > div > input');
		if (firstYearI) firstYearI.checked = true;

		const firstMonthI = te.querySelector('#article-tree > div > div > input');
		if (firstMonthI) firstMonthI.checked = true;
	};

	const applyAccessCount = since => {
		const ACCESS_PER_DAY = 20;
		const DAY = 1000 * 24 * 60 * 60;

		const localOffset = parseInt(localStorage.getItem('localOffset') ?? '0');

		const accessCount = Math.floor(
			(new Date().getTime() - since.getTime()) / DAY * ACCESS_PER_DAY
		) + localOffset;

		localStorage.setItem('localOffset', localOffset + 1);
		const e = document.getElementById('counter');
		e.innerHTML = '';

		for (const c of accessCount.toString().padStart(8, '0')) {
			const span = document.createElement('span');
			span.classList.add('blink', 'image-like', 'big');
			span.textContent = c;
			span.title = `${c}.gif`;
			e.appendChild(span);
		}
	};

	Promise.allSettled([fetchArticles, documentReady]).then(v => {
		applyArticle(v[0].value.article, v[0].value.articleSpecified);
		applyPager(v[0].value.links);
		applyAccessCount(v[0].value.since);
		applyArticleTree(v[0].value.articleTree);
	});

	document.addEventListener('contextmenu', () => {
		alert('右クリック禁止！');
		event.preventDefault();
	});

	document.addEventListener('copy', () => {
		alert('コピー禁止！');
		event.preventDefault();
	});

	// MAKE SLOW
	const nTimeRandom = n => new Array(n)
		.fill(0)
		.map(_ => Math.random())
		.reduce((sum, a) => sum + a, 0) / n;

	const dummyLoading = new Promise(
		f => setTimeout(f, 1000 * nTimeRandom(5))
	);

	Promise.allSettled([fetchArticles, documentReady, dummyLoading]).then(() => {
		loadTips();
		document.getElementsByTagName('body')[0].classList.remove('loading');
	});
})();
