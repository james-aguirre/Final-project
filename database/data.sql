-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "categories" ("categoryId", "name")
values
(1, 'knife'),
(2, 'vandal'),
(3, 'operator'),
(4, 'sheriff');



insert into "products" ( "productName", "price", "categoryId", "imageUrl", "description")
values
( 'blastX Knife', 9.99, 1, 'https://cx.valorbuff.com/blob/BRcfB9CUanCZK+h7l1pOKnsblVHqBtxJKVvShXlN56sbl+c0hVCZ5axNhX-Gva0E?w=900', 'base level variant'),
( 'Glitchpop Knife', 9.99, 1, 'https://cx.valorbuff.com/blob/BRcfB9CUanC2l1JOKN-rlnbqitDXBtxJ5+USh+pVK2sr51DXlVp7l1-YitpGva0E?w=900', 'base level variant'),
( 'Champions Karambit', 19.99, 1, 'https://cx.valorbuff.com/blob/BRcfB9CUanC0i+h7iNc2h6sOlX3nBtxXK1KSht9bK2bqlVhOKacZl+L3KXpGva0E?w=900', 'base level variant'),
( 'Ruination Knife', 19.99, 1, 'https://cx.valorbuff.com/blob/BRcfB9CUanCYiac7lXDNKIs2Kt3nBtcYi+hS5aini6sbKahOiacVhVU0KNUGva0E?w=900', 'level 6 variant'),
( 'Winterwunderland Knife', 9.99, 1, 'https://cx.valorbuff.com/blob/BRcfB9CUanCsKXWn5tDqinbXlViJBtxNK19S5+lJh6bNhVKshtcrlrKYlr-Gva0E?w=900', 'level 4 variant'),
( 'Recon Knife', 9.99, 1,'https://cx.valorbuff.com/blob/BRcfB9CUanC0lXKOKNUY56bq519OBtcVhVKShtW3lIssht3Jl1Jri+-0lVKGva0E?w=900', 'level 5 variant'),
( 'Kingdom Knife', 9.99, 1,'https://cx.valorbuff.com/blob/BRcfB9CUanC0lXKOKNUY56bq519OBtcVhVKShtW3lIssht3Jl1Jri+-0lVKGva0E?w=900', 'base level variant'),
( 'Reaver Knife', 9.99, 1,'https://cx.valorbuff.com/blob/BRcfB9CUanCVlXJ7Kap2lns2hriqBtxXht9S51-0h2b3KXK0lt92KX-b5tUGva0E?w=900', 'base level variant'),
( 'Snowfall Wand', 14.99, 1,'https://cx.valorbuff.com/blob/BRcfB9CUanCO5ahZhtqNlIssKtKOBtcshNUSh+x356bJhNc2K1v0KVhriaKGva0E?w=900', 'base level variant'),
( 'Ego Knife', 14.99, 1,'https://cx.valorbuff.com/blob/BRcfB9CUanCs5aLXKahOl2s0i1Q3BtcrKVCShX-bK2s2hXh2lX3XKtDXhNhGva0E?w=900', 'level 4 variant'),
( 'Champions Vandal', 19.99, 2, 'https://cx.valorbuff.com/blob/BRcfB9CUanC2i1Q3Ka-7insr51pZBtcriXJShNQNKnsVlaK2hrcZiXHqi1hGva0E?w=900', 'base level variant'),
( 'Prime Vandal', 29.99, 2, 'https://cx.valorbuff.com/blob/BRcfB9CUanC2KrL3i1C7h6s75tDJBtxXitJShX-2lIsriXLNi1-rl+hr51CGva0E?w=900', 'level 7 variant'),
( 'RGX 11z Pro Vandal', 29.99, 2, 'https://cx.valorbuff.com/blob/BRcfB9CUan3nlri3KNHnlIbJKVhbBtc0hX9S5txXi6s2hXQ3lriN5aUbi+pGva0E?w=900', 'base level variant'),
( 'Reaver Vandal', 19.99, 2, 'https://cx.valorbuff.com/blob/BRcfB9CUanCOhVp2laUZh2bNKtLXBtxnKXvS5apZ56bJKNpYlXq35tLNlaKGva0E?w=900', 'level 7 variant'),
( 'Ego Vandal', 19.99, 2, 'https://cx.valorbuff.com/blob/BRcfB9CUan3JitCrhX-0h6bX5aLnBtcZit9ShX-Vl2bqiaQX5+UrKV335aKGva0E?w=900', 'base level variant'),
( 'ElderFlame Operator', 29.99, 3, 'https://cx.valorbuff.com/blob/BRcfB9CUan3NKtK7KV-Ylns0KrpZBtxJitvShtlNK2s7itHJlXhsi1U0hV-Gva0E?w=900', 'level 5 variant'),
( 'Reaver Operator', 9.99, 3, 'https://cx.valorbuff.com/blob/BRcfB9CUanCVlVCr5tHXh2bNi1-2BtcViN-S5tHqhnbJK1lnlXKsl+lnKXhGva0E?w=900', 'base level variant'),
( 'Reaver Operator', 14.99, 3, 'https://cx.valorbuff.com/blob/BRcfB9CUanCbh+U2hrKZlIssKtQqBtc7l+cS5tJYK6sblVQXi1hOl+K7lVJGva0E?w=900', 'level 7 variant'),
( 'Spline Operator', 19.99, 3, 'https://cx.valorbuff.com/blob/BRcfB9CUan3NiNcrhN-7ins05+c0BtcYl+hShtcOhnbN5+p2l13Xi+iJKNUGva0E?w=900', 'base level variant'),
( 'Luxe Operator', 19.99, 3, 'https://cx.valorbuff.com/blob/BRcfB9CUan3nKVJ0htJsK6b3i1iJBtcbiXcShXLX56bNlVCYitHni1CbKN-Gva0E?w=900', 'base level variant'),
( 'Singularity Sheriff', 19.99, 4, 'https://cx.valorbuff.com/blob/BRcfB9CUan3XK+K2lax3iIs7lthOBtxNKtpS51CsinssK1Cb5thOK1cZlNhGva0E?w=900', 'level 7 variant'),
( 'Reaver Sheriff', 19.99, 4, 'https://cx.valorbuff.com/blob/BRcfB9CUanC0KXJVltUVi6ssK1K2BtcZKXcS51CrKnbXhrK0lapVhr-2K1hGva0E?w=900', 'level 6 variant'),
( 'Peacekeeper Sheriff', 14.99, 4, 'https://cx.valorbuff.com/blob/BRcfB9CUanCbltDN5tv256sOl192BtcYlVcSh+Ksinsrit3nlVC051UYitcGva0E?w=900', 'base level variant'),
( 'Ronin Sheriff', 14.99, 4, 'https://cx.valorbuff.com/blob/BRcfB9CUanCriXUsKaK2KnbJhVcOBtxnlN-Sh+Lq56sZh+LNKahYKNpsiXUGva0E?w=900', 'base level variant'),
( 'Aristocrat Sheriff', 24.99, 4, 'https://cx.valorbuff.com/blob/BRcfB9CUanCsla-2lVJ7h6s2h+c2Btxn5thShthYl6sV51U0ialNlNQNKVUGva0E?w=900', 'base level variant');
