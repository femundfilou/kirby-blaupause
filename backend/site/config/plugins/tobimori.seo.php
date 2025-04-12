<?php
return [
	'tobimori.seo' => [
		'files.template' => 'image',
		'sitemap' =>  [
			'active' => true,
			'excludeTemplates' => ['error']
		],
		'robots' => [
			'indicator' => false,
			'active' => true,
			'content' => [
				'*' => [
					'Allow' => ['/'],
					'Disallow' => ['/kirby', '/panel', '/content']
				]
			]
		]
	]
];
