SELECT club.club_id AS id, 
club.club_name AS name, 
club.description AS description,
club.profile_image AS club_image,
tag.title AS tag_name
FROM club 
LEFT JOIN club_has_tag ON club.club_id = club_has_tag.club_id 
LEFT JOIN tag ON club_has_tag.tag_id = tag.id